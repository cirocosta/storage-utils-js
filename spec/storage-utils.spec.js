'use strict';

/* globals DatabaseTable:false*/

describe("DatabaseTable", function(){
	var dbTable = new DatabaseTable('stub');
	var stub_obj = {};
	beforeEach(function(){
		dbTable.parsed_table = [];
		stub_obj.stub_key = "stub_value";
	});

	describe("When first initializing the db", function(){
		it("must fail if no table_name is given", function(){
			var create_table_without_name = function(){
				new DatabaseTable();
			};
			expect(create_table_without_name).toThrow();
		});

		it("should not fail if table_name is given", function(){
			var create_table_with_name = function(){
				new DatabaseTable('table_name');
			};
			expect(create_table_with_name).not.toThrow();
		});

		it("must fail if initialized with not known storage type", function(){
			var create_table_with_invalid_storage_type = function(){
				new DatabaseTable('table_name', 'strange_stoge_type');
			};
			expect(create_table_with_invalid_storage_type).toThrow();
		});

		it("should not fail if storage is local", function(){
			var create_table_with_stoge_type_local = function(){
				new DatabaseTable('table_name', 'local');
			};
			expect(create_table_with_stoge_type_local).not.toThrow();
		});

		it("should not fail if storage is session", function(){
			var create_table_with_stoge_type_session = function(){
				new DatabaseTable('table_name', 'session');
			};
			expect(create_table_with_stoge_type_session).not.toThrow();
		});

		it("should be able to parse", function(){
			expect(dbTable.parseDatabaseTable()).toBeDefined();
		});
		
		it("should be empty",function(){
			expect(dbTable.parsed_table.length).toEqual(0);
		});
	});

	describe("If performing CRUD", function(){
		
		describe("when putting",function(){
			it("should store a string", function(){
				dbTable.putObject("element");
				expect(dbTable.parsed_table).toContain("element");
				expect(dbTable.parsed_table.length).not.toEqual(0);
			});

			it("should store any object", function(){
				dbTable.putObject(stub_obj);
				expect(dbTable.parsed_table).toContain(stub_obj);
				expect(dbTable.parsed_table.length).not.toEqual(0);
			});
		});


		describe("when removing", function(){
			it("should stay empty if empty", function(){
				dbTable.deleteObjectFromPosition(0);
				expect(dbTable.parsed_table.length).toEqual(0);
				dbTable.deleteObjectFromPosition(1);
				expect(dbTable.parsed_table.length).toEqual(0);
			});

			it("should be empty if removing the only one", function(){
				dbTable.putObject("element");
				expect(dbTable.parsed_table.length).toEqual(1);															
				dbTable.deleteObjectFromPosition(0);
				expect(dbTable.parsed_table.length).toEqual(0);											
			});

			it("should not have the element any more", function(){
				dbTable.putObject("element");
				dbTable.putObject("element1");
				dbTable.putObject("element2");
				expect(dbTable.parsed_table.length).toEqual(3);															
				dbTable.deleteObjectFromPosition(0);
				expect(dbTable.parsed_table).not.toContain("element");				
				expect(dbTable.parsed_table).toContain("element1");				
			});

			it("should be possible to remove giving an object", function(){
				dbTable.putObject(stub_obj);
				expect(dbTable.parsed_table).toContain(stub_obj);
				dbTable.deleteObject(stub_obj);
				expect(dbTable.parsed_table).not.toContain(stub_obj);				
			});
		});

		describe("when reading", function(){
			it("should get an object position", function(){
				dbTable.putObject(stub_obj);
				expect(dbTable.getObjectPosition(stub_obj)).toEqual(0);				
			});

			it("should not return a valid position if empty", function(){
				expect(dbTable.getObjectPosition(stub_obj)).not.toEqual(0);
				expect(dbTable.getObjectPosition(stub_obj)).toEqual(-1);
			});

			it("should not be able to get from an id if there's no obj with id", 
				function(){
				expect(dbTable.getById('1')).toBeNull();
				expect(dbTable.getById(1)).toBeNull();
				expect(dbTable.getById(null)).toBeNull();
			});

			it("should not be able to get from an ID field that don't exists",
				function(){
				expect(dbTable.getById('1','id_field')).toBeNull();
				expect(dbTable.getById(1,'id_field')).toBeNull();
			});

			it("should be able to get from id", function(){
				stub_obj.id = '1';
				dbTable.putObject(stub_obj);
				expect(dbTable.getById('1')).toEqual(stub_obj);
			});

			it("should be able to get from a custom id", function(){
				stub_obj.id_field = '1';
				dbTable.putObject(stub_obj);
				expect(dbTable.getById('1','id_field')).toEqual(stub_obj);
			});
		});

	});

});