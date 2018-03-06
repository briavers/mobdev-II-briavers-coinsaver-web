const Medium = function(fields) {
  if(fields) {
    if(fields['reference']) {
      this.reference = fields['reference'];
    }

    if(fields['type']) {
      this.type = fields['type'];
    }
  }
}

module.exports = Medium;