'use strict'
const dark = 'hsl(200, 20%, 20%)'
const light = '#347462'
module.exports = {
    appBar: {
        background: '#000000',
        opacity: 0.3
    },
    container: {
      textAlign: 'left',
      justifyContent: 'flex-start'
    },
    link: {
        flex: 1,
        padding: 11,
        color: '#73C4B5',
        fontWeight: 200,
        textDecoration: 'none',

    },
    activeLink: {
        flex: 1,
        padding: 11,
        fontWeight: 200,
        background: light,
        color: 'white',
        textDecoration: 'none',
    },
    menu: {
        background: '#347462',
    },
};
