var validation =  {
    email: function(input) {
        var re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
        return re.test(input);
    },
    equal: function(input1, input2) {
        return (input1 == input2);
    },
    required: function(input) {
        if (input == null || input == "" || input == undefined)
            return false;
        else
            return true;
    },
    length: function(input, start, end) {
        return (input.length >= start && input.length <= end);
    },
    numeric: function(input) {
        var re = /^[0-9]+$/;
        return re.test(input);
    },
    password: function(input) {
        // var re = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{6,16}$/;
        var re = /^[a-zA-Z0-9]{7,99}$/;
        return re.test(input);
    },
    name: function(input) {
        var regexName = /[!"\[\]{}%^&*:@~#';/.<>\\|`]/g;
        return regexName.test(input);
    },
    name2: function(input) {
        var regexName2 = /\d/;
        return regexName2.test(input);
    },
    id: function(input) {
        var re = /^[a-zA-Z][0-9]{3}$/;
        return re.test(input);
    },
    firstUp: function(input) {
        var re = /^[A-Z]$/;
        return re.test(input);
    }
};
