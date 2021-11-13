/**
 * Kalender // CRUD CLASS
 */
class Crud {
    /**
     * TOKEN // faycal is the constant
     * @returns {string}
     * @constructor
     */
    get TOKEN() {
        return 'faycal'
    }

    /**
     * the url constant
     * @returns {string}
     * @constructor
     */
    get URL() {
        return 'http://wifi.1av.at/birthday'
    }

    //region CONST methods //POST GET PUT DELETE
    /**
     * POST method CONST
     * @returns {string}
     * @constructor
     */
    get MHETHOD_POST() {
        return 'POST'
    }

    /**
     * GET method CONST
     * @returns {string}
     * @constructor
     */
    get MHETHOD_GET() {
        return 'GET'
    }

    /**
     * PUT method CONST // EDIT //
     * @returns {string}
     * @constructor
     */
    get MHETHOD_PUT() {
        return 'PUT'
    }

    /**
     * DELETE method CONST
     * @returns {string}
     * @constructor
     */
    get MHETHOD_DELETE() {
        return 'DELETE'
    }

    //endregion


    //region Constructor
    /**
     * Start parameter
     */
    constructor() {
        this.data = {}; // to store data if we have or need
        this.urlToken = this.URL + '/' + this.TOKEN; // the url + token
        this.message = ''; // returned message if we need like "Message are deleted !!"
        this.color = '';
        this.sorted = false;
    }
    //endregion

    //region AJAX maker
    /**
     * Ajax ==>
     * @param url {string}
     * @param method {string}
     * @param data {object}
     * @param callback  callback function
     */
    ajax( url, method, data, callback ) {
        $.ajax( {
            url:url,
            method:method,
            data:data,
            success:callback,
            error:callback,
        } );
    }
    //endregion

    //region element creator
    /**
     * here we made the table of the list with button
     * @param data {object}
     */
    elementsMaker( data ) {
        let $tbody = $( '#tbody' );
        $tbody.empty(); // make array <tbody> empty to put the list

        for ( let i in data ) {
            let id = data[ i ].id; // take the ID
            let hId = '#' + id; // add # to the id
            let $td = $( '<td>' )
            $( '<tr>' ).attr( 'id', id ).appendTo( $tbody );
            /////////////// name
            $( '<th scope="row">' )
                .html( data[ i ].name )
                .appendTo( $( hId ) )
            /////////////// birthday
            $( '<td>' )
                .html( data[ i ].geburtstag )
                .appendTo( $( hId ) )
            /////////////// age
            $( '<td>' )
                .html( data[ i ].age )
                .appendTo( $( hId ) );
            /////////////// birthday in
            ( data[ i ].birthday === 0 ) ? data[ i ].birthday = 'Today'
                : ( data[ i ].birthday === 1 ) ? data.birthday = 'Tomorrow' : data[ i ].birthday
            $( '<td>' )
                .html( data[ i ].birthday )
                .appendTo( $( hId ) )
            /////////////// btn edit
            $( '<button>' )
                .addClass( 'btn btn-success btn-sm m-2 btnEdit' )
                .attr( 'data-btn', 'edit' )
                .html( 'Edit' )
                .appendTo( $td )
            /////////////// btn delete
            $( '<button>' )
                .addClass( 'btn btn-danger btn-sm m2 btnDelete' )
                .attr( 'data-btn', 'delete' )
                .html( 'Delete' )
                .appendTo( $td )
            /////////////// all
            $td.appendTo( $( hId ) )
        }
        if ( this.message !== '' ) { // check if message is not empty
            this.messageAlert( this.message, this.color, () => {
                setTimeout( () => {
                    $( '.alert' ).remove();
                }, 3000 );
            } );
        }
        this.cleaner();
        this.btnRead();
    };
    //endregion

    //region Element edit
    /**
     * Element editor
     * here we edit the element for Put/Update Method
     * @param id {number}
     */
    editElement( id ) {
        let hashId = '#' + id
        let $tr = $( hashId ).children();
        let name = $tr[ 0 ].innerHTML;
        let date = $tr[ 1 ].innerHTML
        $tr[ 0 ].innerHTML = '';
        $tr[ 1 ].innerHTML = '';
        // Add input field
        $( '<input type="text" class="form-control form-control-sm" id="nameInput" placeholder="name" value="" required>' )
            .val( name )
            .appendTo( $tr[ 0 ] )
        $( '<input type="date" class="form-control form-control-sm" id="dateInput" required>' )
            .val( date )
            .appendTo( $tr[ 1 ] )
        // end add field
        let $btnEdit = $tr[ 4 ].firstElementChild
        $btnEdit.classList.replace( 'btn-success', 'btn-primary' )
        $btnEdit.classList.replace( 'btnEdit', 'btnPut' )
        $btnEdit.setAttribute( 'data-btn', 'put' )
        $btnEdit.innerHTML = 'Add'
        let $btnCancel = $tr[ 4 ].lastElementChild
        $btnCancel.classList.replace( 'btnDelete', 'btnCancel' )
        $btnCancel.setAttribute( 'data-btn', 'cancel' )
        $btnCancel.innerHTML = 'Cancel'
    }
    //endregion

    //region CRUD Section
    /**
     * CRUD Created Method
     * @param data {Object} data
     */
    create( data ) {
        this.ajax( this.urlToken, this.MHETHOD_POST, data, ( ) => {
            this.message = 'Created name: ' + name;
            this.color = 'success';
            this.getData();
        } )
    }

    /**
     * CRUD Read Method
     */
    getData() {
        let data = {};
        this.ajax( this.urlToken, this.MHETHOD_GET, data, ( response ) => {
            for ( const i in response ) {
                let birthday = this.calculateNextBirthday( response[ i ].geburtstag );
                if ( birthday === 0 ) {
                    response[ i ].birthday = 0;
                } else if ( birthday === 1 ) {
                    response[ i ].birthday = 1
                } else {
                    response[ i ].birthday = birthday;
                }
                response[ i ].age = this.calculateAge( response[ i ].geburtstag );
            }
            if ( this.sorted ) {
                this.elementsMaker( this.orderBy( response ) )
            } else {
                this.elementsMaker( response )
            }
        } )
    }

    /**
     * CRUD Put/Update Method
     * @param id {number}
     * @param data {object}
     */
    edit( id, data ) {
        let url = this.urlToken + '/' + id
        this.ajax( url, this.MHETHOD_PUT, data, () => {
            this.message = 'Edited name: ' + data.name;
            this.color = 'success';
            this.getData()
        } )
    }

    /**
     * CRUD Delete Method
     * @param id {string} id
     * @param data {Object} data
     */
    delete( id, data ) {
        let url = this.urlToken + '/' + id;
        this.ajax( url, this.MHETHOD_DELETE, '', () => {
            this.message = 'Deleted name: ' + data.name;
            this.color = 'danger';
            this.getData()
        } )
    }
    //endregion

    //region Alert maker
    /**
     * create an alert div with text and color and callback function (to make a setTimeout to remove the alert div)
     * @param message {string}
     * @param color {string}
     * @param callback callback function
     */
    messageAlert( message, color, callback ) {
        $( `<div class="mx-auto my-3 alert alert-${color}">` ).html( message ).appendTo( $( '#first' ) )
        callback();
    }

    //endregion

    //region button add listener for all
    /**
     * add Event Listener in all button // call after we (CRUD).
     */
    btnRead() {
        let _this = this; // save the 'this' while we use old syntax of function methode
        let $btn = $( 'button' );
        let id = 0;
        let $btnBirthday = $( '.btnOrderBirthday' );
        let $btnName = $( '.btnOrderName' );
        $btn.on( 'click', function () {
            let $elem = $( this );
            this.data = {
                name:$elem.parent().parent().children( 'th' ).html(),
                geburtstag:$elem.parent().parent().children( 'td' ).html(),
            }
            switch ( $elem.attr( 'data-btn' ) ) {
                case 'edit':// if the button is an Edit button then ==> PUT method
                    id = $elem.parent().parent().attr( 'id' ); // we take the id of the record we want to edit // the first parent is the <td> of this button, the second parent is <tr> and here we have the id of the record
                    _this.editElement( id )
                    break
                case 'delete': // if the button is a Delete button then ==> DELETE method
                    id = $elem.parent().parent().attr( 'id' ); // we take the id of the record we want to delete // the first parent is the <td> of this button, the second parent is <tr> and here we have the id of the record
                    _this.delete( id, this.data );
                    break
                case 'put' :// if the button is an Edit button then ==> PUT method
                    id = $elem.parent().parent().attr( 'id' ); // we take the id of the record we want to delete // the first parent is the <td> of this button, the second parent is <tr> and here we have the id of the record
                    this.data = {
                        name:$elem.parent().parent().children( 'th' ).children( 'input' ).val(),
                        geburtstag:$elem.parent().parent().children( 'td' ).children( 'input' ).val(),
                    };
                    _this.edit( id, this.data );
                    break
                case 'cancel' : // if the button is a Cancel button then ==> GET method
                    _this.getData();
                    break
                case 'birthday' : // if the button is a Sort button then ==> GET method
                    _this.sorted = 'birthday'; // sort take birthday
                    $btnBirthday.addClass( 'd-none' );
                    $btnName.removeClass( 'd-none' );
                    _this.getData()
                    break
                case 'name' : // if the button is a Sort button then ==> GET method
                    _this.sorted = 'name'; // sort take name
                    $btnName.addClass( 'd-none' );
                    $btnBirthday.removeClass( 'd-none' );
                    _this.getData()
                    break
                case 'create':
                    $( '#modalAdd' ).modal( 'hide' );
                    crud.data = {
                        name:$( '#nameInput' ).val(),
                        geburtstag:$( '#dateInput' ).val()
                    }
                    crud.create( crud.data ); // sent to creat method
                    break
                default:
                    console.log( 'default' )
            }
        } )
    }

    //endregion

    //region Order by -- method
    /**
     * Object order by birthday or name (what in this sorted )
     * @param data {object}
     * @returns {object}
     */
    orderBy( data ) {
        data.sort( ( a, b ) => ( a[ this.sorted ] > b[ this.sorted ] ) ? 1 : -1 )
        return data
    }
    //endregion

    //region age calculator
    /**
     * Age calculator
     * @param birthday {string} // like (2019-12-31)
     * @returns {string|string|number} return small text when number is small then 0, or age in number
     */
    calculateAge( birthday ) {
        let d1 = new Date( birthday )
        let d2 = new Date() - d1.getTime();
        let diff = new Date( d2 );
        let age = Math.floor( diff.getUTCFullYear() - 1970 );
        return ( age < -1 ) ? '<small>will be born in: ' + ( age * -1 ) + '</small>'
            : ( age < 0 ) ? '<small>will be born in soon =></small>'
                : ( age === 0 ) ? '<1' : age;

    }
    //endregion

    //region birthday calculator //
    /**
     * method of calculating the remaining days before the birthday (result in day {number} or in {string} (today or tomorrow) )
     * @param birthday {string}
     * @returns {string|number}
     */
    calculateNextBirthday( birthday ) {
        let nextBirthday, nextTxt, days, result;
        let d1 = new Date( birthday )
        let day = d1.getDate(); // get the date
        let month = d1.getMonth() + 1; // get the month // month start at 0 in JavaScript ^_^
        let year = new Date().getFullYear(); // get the full year of today
        nextBirthday = new Date( year + '-' + month + '-' + day ); // create date for the next birthday

        if ( nextBirthday.getFullYear() === new Date().getFullYear() &&
            nextBirthday.getMonth() === new Date().getMonth() &&
            nextBirthday.getDate() === new Date().getDate() ) { // check ==> have birthday today or not
            result = 0; // Happy birthday
        } else { // else we continue
            if ( nextBirthday < Date.now() ) { // check if the birthday is at this year or next years
                // if next we add 1 year and  recreate
                year++;
                nextTxt = year + '-' + month + '-' + day;
                nextBirthday = new Date( nextTxt );
            }
            days = nextBirthday.getTime() - new Date(); // birthday date substrate from now date
            days = days / ( ( 1000 * 60 * 60 * 24 ) ) // divide by (1000 millisecond ) x (60 seconds) x (60 minutes) x (24 hours) // all this is 1 day in milliseconds
            result = Math.ceil( days );
        }
        return result;
    }
    //endregion

    //region clear method
    /**
     * clear the message data and input data
     */
    cleaner() {
        this.message = '';
        this.color = '';
        $( '#nameInput' ).val( '' ); //Clear the input name
        $( '#dateInput' ).val( '' ); //Clear the input date
    }
    //endregion

    ///// Class End /////
}

//region AJAX listener for Loading action
$( document ).ajaxStart( function () {
    $( 'button' ).prop( 'disabled', true )
    crud.messageAlert( 'Loading...', 'warning', () => {
    } )
    $( `<div class="loader">
  <div class="el1 ep1"></div>
  <div class="el2 ep2"></div>
  <div class="el1 ep3"></div>
  <div class="el2 ep4"></div>
  <div class="el1 ep5"></div>
  <div class="el2 ep6"></div>
  <div class="el1 ep7"></div>
</div>` ).appendTo( $( 'body' ) )
} )
$( document ).ajaxStop( function () {
    $( '.alert' ).remove();
    $( '.loader' ).remove();
    $( 'button' ).prop( 'disabled', false )
} )
//endregion

crud = new Crud();
crud.getData()