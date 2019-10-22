exports.getBillboardsPosition = (instructoinsArray) => {
    let droneCoordinate = { x: 0, y: 0 };
    let billboardPosition = [];

    instructoinsArray.map(order => {
        if( order === '^') {
            droneCoordinate.y += 1;
        }
        if( order === 'v') {
            droneCoordinate.y -= 1;
        }
        if( order === '>') {
            droneCoordinate.x += 1;
        }
        if( order === '<') {
            droneCoordinate.x -= 1;
        }
        if( order === 'x') {
            let newCoordinate = {}
            newCoordinate.x = droneCoordinate.x;
            newCoordinate.y = droneCoordinate.y;
            billboardPosition.push( newCoordinate );
        } 
    });

    const billboardPositionArray = billboardPosition.filter(( position, index , self ) => 
        index === self.findIndex( item => 
            item.x === position.x && item.y === position.y
        )
    );

    return billboardPositionArray;
}

exports.getSubArray = ( option, array ) => {
    let newArray = [];

    if( option === 'odd') {
        newArray = array.filter( (item , index) => {
            if( index % 2 === 1 ){
                return item;
            }} );
    }
    
    if( option === 'even') {
        newArray = array.filter(( item , index ) => {
            if( index % 2 === 0 ){
                return item;
            }
        });
    }

    return newArray;
}

exports.checkValidity = (instructionsArray) => {
    const checkedArrayLength = instructionsArray.filter(item  => {
        if( item === '^' || item === 'v' 
            || item === '<' || item === '>' 
            || item === 'x') {
          return item;
        }
    }).length;

    if( instructionsArray.length != checkedArrayLength) {
      return false;
    }

    return true;
}