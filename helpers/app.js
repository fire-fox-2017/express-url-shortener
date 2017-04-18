
module.exports = {
	randomString: function(str) {
    console.log(`randomString ${str}`);

    var random_str = "";
    var random_str_length = 5;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0 ; i < random_str_length ; i++) {
      random_str += possible.charAt( Math.floor( Math.random() * possible.length) );
    }

    return random_str;
  }
}
