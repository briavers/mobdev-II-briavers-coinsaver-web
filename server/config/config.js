module.exports = {
  'database': {
    'connectionString': 'mongodb://rootcoinsaver:secret@ds219130.mlab.com:19130/coinsaver'
  },
  'auth': {
    'bcrypt': {
      'SALT_WORK_FACTOR': 10
    },
    'jwtSecret': 'mobdev2_nmd_gdm',
    'jwtSession': {
        session: true
    },
    'facebook': {
      'clientID': '148934219295666',
      'clientSecret': 'e7cbc584bb29cc4f4649bf7e1faf62d5'
    }
  }  
};