'use strict'

const dark = 'hsl(200, 20%, 20%)'
const light = '#fff'

module.exports = {
    container: {
      textAlign: 'center',
      paddingTop: 10,
      justifyContent: 'flex-start'
    },
    link: {
        padding: 11,
        color: dark,
        fontWeight: 200,
        textDecoration: 'none'
    },
    activeLink: {
        padding: 11,
        fontWeight: 200,
        background: light,
        color: '#FF5722',
        textDecoration: 'none'
    }
};
