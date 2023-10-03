const fs = require('fs');

if(fs.existsSync('./app.js')) {
    fs.writeFile('./app.js', '', (err) => {
        if(err) {
            console.log(err);
        }
        console.log('file was written');
    });
}