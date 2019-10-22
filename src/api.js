const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');
const { getSubArray, getBillboardsPosition, checkValidity} = require('./service');

app.use(cors());
app.use(fileUpload());
 
app.get('/', (req, res) => {
    res.json({foo: 'bar'});
});

app.post('/api/instructions', (req, res) => {

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status( 400 ).send( 'No file was uploaded.' );
    }

    const testFile = req.files.file;
    const testString = testFile.data.toString( 'utf-8' );
    const instructoinsArray = testString.match( /./g ); 
    if(!checkValidity(instructoinsArray)) {
        return res.status( 400 ).send( 'Wrong file was uploaded.' );
    }
    const firstDroneInstructoins = getSubArray( 'even',instructoinsArray );
    const secondDroneInstructoins = getSubArray( 'odd',instructoinsArray );

    const partOnePosition = getBillboardsPosition( instructoinsArray );
    const firstQusetionAnswer = partOnePosition.length;

    const firstDronePosition = getBillboardsPosition( firstDroneInstructoins );
    const secondDronePosition = getBillboardsPosition( secondDroneInstructoins );

    const secondQuestionAnswer = firstDronePosition.concat(
        secondDronePosition.filter(item =>
            !firstDronePosition.includes(item)
        )).length;

    return res.json({
        status: 200,
        data: {
            'firstQusetionAnswer' : firstQusetionAnswer,
            'secondQuestionAnswer' : secondQuestionAnswer
        }
    });
  });

app.listen(4001, () => console.log(`Api started at http://localhost:4001`));

