/** CFuncs v0.0.1 - Db Utils
 *   This file contains the basic objects for doing basic ops
 *   with the Database.
 *
 *   Realised under MIT License
 *
 *
 *   //TODO:
 *       - observer pattern for notifyng on change
 */

function DatabaseTable(table_name){
    if(!table_name || (typeof(table_name) === 'undefined')){
        throw "DatabaseTable(table_name) needs a valid name";
    }
    this.table_name = table_name; 
    this.parsed_table  = null;
    this.parseDatabaseTable();
}

DatabaseTable.prototype.parseDatabaseTable = function(){
    try{
        this.parsed_table = JSON.parse(localStorage[this.table_name]);
        return this.parsed_table;
    } catch(err){
        this.parsed_table = [];
    }
};

DatabaseTable.prototype.saveState = function(){
    localStorage[this.table_name] = JSON.stringify(this.parsed_table);
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
