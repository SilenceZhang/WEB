//车辆           car_id
//网店           shop_id
//充电桩       power_id

var Map = function() {
	this.data = new Array();
	this.size = function() {
		return this.data.length;
	}
	this.isEmpty = function() {
		return (this.data.length < 1);
	}
	
	this.clear = function() {
		this.data.length = 0;
	}
	this.put = function(_key, _value) {
		for ( var i = 0; i < this.size(); i++) {
			if (this.data[i].key == _key) {
				this.data[i].value = _value;
				return;
			}
		}
		this.data.push({
			key : _key,
			value : _value
		});
	}
	this.remove = function(_key) {
		try {
			for ( var i = 0; i < this.size(); i++) {
				if (this.data[i].key == _key)
					this.data.splice(i, 1);
				return true;
			}
		} catch (e) {
			return false;
		}
		return false;
	}
	this.get = function(_key) {

		try {
			for ( var i = 0; i < this.size(); i++) {
				if (this.data[i].key == _key) {
					var _value = this.data[i].value;
					return _value;
				}
			}
		} catch (e) {
			return null;
		}
		return null;
	}
	this.containsKey = function(_key) {
		try {
			for ( var i = 0; i < this.size(); i++) {
				if (this.data[i].key == _key) {
					return true;
				}
			}
		} catch (e) {
			return false;
		}
		return false;
	}
	this.getValues = function() {
		var values = new Array();
		try {
			for ( var i = 0; i < this.size(); i++) {
				values.push(this.data[i].value);
			}
		} catch (e) {
			alert("Can not get Map Values ! {1}" + e.message);
			return null;
		}
		return values;
	}
	this.getKeys = function() {
		var keys = new Array();
		try {
			for ( var i = 0; i < this.size(); i++) {
				keys.push(this.data[i].key);
			}
		} catch (e) {
			alert("Can not get Map Keys ! {1}" + e.message);
			return null;
		}
		return keys;
	}
}