let User = function(fields) {
  this.firstName = null;
  this.lastName = null;
  if(fields) {
    if(fields['firstName']) {
      this.firstName = fields['firstName'];
    }
    if(fields['lastName']) {
      this.lastName = fields['lastName'];
    }
  }
}
User.prototype.thumbnail = null;
User.prototype.major = null;
User.prototype.minor = null;
User.prototype.quote = null;
User.prototype.media = [];

module.exports = User;