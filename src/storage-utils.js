function DatabaseTable(table_name, storage_type){
    /*
    Type must be 'local' or 'session' to define the storage
    type.
    */
    if(!table_name || (typeof(table_name) === 'undefined')){
        throw "DatabaseTable(table_name) needs a valid name";
    }
    if(!storage_type || (typeof(storage_type) === 'undefined')){
        this.storage_type = 'local';
        console.log("DatabaseTable "+table_name+" defined with local storage by default.");
    }else if(storage_type === 'local' || storage_type === 'session'){
        this.storage_type = storage_type;
    }else{
        throw "The second argument must be 'local' or 'session'";
    }
    this.table_name = table_name; 
    this.parsed_table  = null;
    this.parseDatabaseTable();
}

DatabaseTable.prototype.parseDatabaseTable = function(){
    try{
        this.parsed_table = JSON.parse(this.getFromStorage());
    } catch(err){
        this.parsed_table = [];
    }
    return this.parsed_table;
};

DatabaseTable.prototype.getFromStorage = function(){
    if(this.storage_type === 'local'){
        localStorage.getItem(this.table_name);
    }else if(this.storage_type === 'session'){
        sessionStorage.getItem(this.table_name);
    }
};

DatabaseTable.prototype.setInStorage = function(value){
    if(this.storage_type === 'local'){
        localStorage.setItem(this.table_name, value);
    }else if(this.storage_type === 'session'){
        sessionStorage.setItem(this.table_name, value);
    }
};

DatabaseTable.prototype.saveState = function(){
    var stringParsedTable = JSON.stringify(this.parsed_table);
    this.setInStorage(stringParsedTable);
};

DatabaseTable.prototype.deleteObjectFromPosition = function(position){
    if(this.parsed_table){
        if(position > -1){
            this.parsed_table.splice(position,1);
            this.saveState();
            return true;
        }
    }
    return false;
}; 

DatabaseTable.prototype.deleteObject = function(object_to_delete){
    if(this.parsed_table){
        if(object_to_delete !== null){
            var obj_index = -1;
            for(var i = 0; i < this.parsed_table.length; i++){
                if(this.parsed_table[i] === object_to_delete){
                    obj_index = i;
                    this.deleteObjectFromPosition(obj_index);
                    break;
                }
            }
            return obj_index; 
        }
    }
    return -1;
};

DatabaseTable.prototype.getById = function(id,id_field){
    if(typeof(id_field) === 'undefined'){
        id_field = 'id';
    }
    for(var i in this.parsed_table){
        var curr_elem = this.parsed_table[i];
        if(curr_elem[id_field].toString() === id.toString()){
            return curr_elem;
        }
    }
    return null;
};

DatabaseTable.prototype.getObjectPosition = function(object){
    if(this.parsed_table){
        for(var i = 0; i < this.parsed_table.length; i++){
            if(this.parsed_table[i] === object){
                return i;
            }
        }
    }
    return -1;
};

DatabaseTable.prototype.putObject = function(object_to_save){
    var saved_obj = this.parsed_table.push(object_to_save);
    this.saveState();
    return saved_obj;
};

DatabaseTable.prototype.updateObject = function(object_to_update){
    if(this.parsed_table){
        if(typeof(object_to_update) !== 'undefined'){
            var obj_index = this.getObjectPosition(object_to_update);
            if(obj_index > -1){
                this.parsed_table[obj_index] = object_to_update;
                this.saveState();
                return true;
            }
            return false;
        } 
        return false;
    }
    return this.putObject(object_to_update);
};
