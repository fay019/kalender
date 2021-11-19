/**
 * Kalender // CRUD CLASS
 */
class Crud {

    //region Const TOKEN
    /**
     * TOKEN // faycal is the constant
     * @returns {string}
     * @constructor
     */
    get TOKEN() {
        return 'faycal'
    }

    //endregion

    //region Const URL
    /**
     * the url constant
     * @returns {string}
     * @constructor
     */
    get URL() {
        return 'http://wifi.1av.at/birthday'
    }

    //endregion

    //region CONST Methods //POST/Creat - GET/Read - PUT/Update - DELETE/Delete
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
        this.dateSeparator = '/' // date Separator like  01/01/1990 or 01.01.1990
        this.urlToken = this.URL + '/' + this.TOKEN; // the url + token
        this.message = ''; // returned message if we need like "Message are deleted !!"
        this.color = ''; // this is for alert color
        this.postion = { // for positon of the data in table ==> DOM
            name:0,
            geburtstag:1,
            age:2,
            birthday:3,
            btn:4,
        };
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

    //region element construct
    /**
     * method to create element
     * made to avoid redundancy
     * @param tag {string} take the tag name to crate element
     * @param text {string/number} text for html
     * @param parent {string} take the tag name of parent
     */
    creatElement( tag, text, parent ) {
        $( tag ) // element for name
            .html( text )
            .appendTo(
                $( parent )
            );
    };
    //endregion

    //region element creator in Table
    /**
     * here we made the table of the list with button
     * @param data {object}
     */
    elementsMaker( data ) {
        let $tbody = $( '#tbody' ); //get the body Element
        $tbody.empty(); // make element <tbody> empty to put the read list from AJAX
        this.data = data;

        for ( let i in data ) { // browse our object
            console.log( 'le type age: ', typeof data[ i ].age )
            console.log( 'le type birthday: ', typeof data[ i ].birthday )
            let date = '';
            let birthdayText = '';
            let dateO = new Date( data[ i ].geburtstag );
            let id = data[ i ].id; // save the ID
            let hId = '#' + id; // add # to the id, for selector
            let $td = $( '<td>' ); // creat "td" element

            $( '<tr>' ).attr( 'id', id ).appendTo( $tbody ); // set the id on our element (with the same registration id, and use it later to find it easily)
            /////////////// name
            this.creatElement( '<th scope="row">', data[ i ].name, $( hId ) ); // element for name
            /////////////// birthday

            date = ( '0' + dateO.getDate() ).slice( -2 ) // '0' + to have 01 or 02 ... and if the days are 10 and more like, then we have 010, 011 ... and slice (-2) we only take the 2 (- that is to say the 2 last) character if '01' we have '01' or if '010' then has '10'
            date += this.dateSeparator + ( '0' + ( dateO.getMonth() + 1 ) ).slice( -2 ) // month start at 0 in javascript and same for '0'+ and slice(-2) + separator
            date += this.dateSeparator + dateO.getFullYear() // get year in YYYY format + separator
            // date from 2021-11-02 to 02-11-2021
            this.creatElement( '<td>', date, $( hId ) ); // element for birthday
            /////////////// age
            this.creatElement( '<td>', data[ i ].age, $( hId ) );// element for age
            /////////////// birthday in days
            // /birthday in "text" string if it is equal to or less than 1
            ( data[ i ].birthday === 0 ) ? birthdayText = 'Today'
                : ( data[ i ].birthday === 1 ) ? birthdayText = 'Tomorrow' : birthdayText = data[ i ].birthday;
            this.creatElement( '<td>', birthdayText, $( hId ) ); // element for birthday --
            /////////////// btn edit
            this.creatElement( '<button class="btn btn-success btn-sm m-2 btnEdit" data-btn="edit">', 'Edit', $( $td ) );// element for btn edit
            /////////////// btn delete
            this.creatElement( '<button class="btn btn-danger btn-sm m-2 btnDelete" data-btn="delete">', 'Delete', $( $td ) );// element for btn delete
            /////////////// all
            $td.appendTo( $( hId ) ) // add to parent element
        }
        this.btnRead(); // start to add listener  to all button
    };

    //endregion

    //region Element edit
    /**
     * Element editor
     * here we edit the element for Put/Update Method
     * @param id {number}
     * @param boolean {boolean}
     */
    editElement( id, boolean ) {
        let date, name;
        let hashId = '#' + id
        let $tr = $( hashId ).children();
        for ( let i = 0; i < this.data.length; i++ ) {
            if ( this.data[ i ].id === id ) {
                name = this.data[ i ].name;
                date = this.data[ i ].geburtstag;
            }
        }
        $tr[ this.postion.name ].innerHTML = '';
        $tr[ this.postion.geburtstag ].innerHTML = '';

        // Add input field
        $( '<input type="text" class="form-control form-control-sm" id="nameInput" placeholder="name" value="" required>' )
            .val( name )
            .addClass( boolean ? 'is-invalid' : '' )
            .removeClass( !boolean ? 'is-invalid' : '' )
            .appendTo( $tr[ this.postion.name ] )
        $( '<input type="date" class="form-control form-control-sm" id="dateInput" required>' )
            .val( date )
            .addClass( boolean ? 'is-invalid' : '' )
            .removeClass( !boolean ? 'is-invalid' : '' )
            .appendTo( $tr[ this.postion.geburtstag ] )
        // end add field

        let $btnEdit = $tr[ this.postion.btn ].firstElementChild
        $btnEdit.classList.replace( 'btn-success', 'btn-primary' )
        $btnEdit.classList.replace( 'btnEdit', 'btnPut' )
        $btnEdit.setAttribute( 'data-btn', 'put' )
        $btnEdit.innerHTML = 'Add'
        let $btnCancel = $tr[ this.postion.btn ].lastElementChild
        $btnCancel.classList.replace( 'btnDelete', 'btnCancel' )
        $btnCancel.setAttribute( 'data-btn', 'cancel' )
        $btnCancel.innerHTML = 'Cancel'
    }
    //endregion


    //region input controller
    /** input controller
     * check if user give us empty data or not
     * @param data {object}
     */
    inputController( data ) {
        if ( data.name !== '' && data.geburtstag !== '' ) {
            // we have not empty data then we can create
            this.create( data )
        }
        // Empty data we do nothing and wait ti some new action from user
        return false
    }
    //endregion

    //region CRUD Section
    /**
     * creat new data
     * CRUD Created Method
     * @param data {Object} data
     */
    create( data ) {
        this.ajax( this.urlToken, this.MHETHOD_POST, data, () => {
            this.message = 'Created name: ' + data.name; // add message when success
            this.color = 'success'; // add bootstrap color for success
            this.getData(); // reload data
        } )
    }

    /**
     * CRUD Read Method
     * read all data from server
     * @param orderBy {string} // wich field name we want order // default is by name
     * @param direction {string} // wich direction of sort ascendant or descendant // default is ascendant
     */
    getData( orderBy = 'name', direction = 'asc' ) {
        this.ajax( this.urlToken, this.MHETHOD_GET, {}, ( response ) => {
            for ( const i in response ) { // add age and birthday fiel in our object
                response[ i ].birthday = this.calculateNextBirthday( response[ i ].geburtstag ); // the 'age' field is the result of calculating the person's age
                response[ i ].age = this.calculateAge( response[ i ].geburtstag ); // the 'birthday' field is the result of the calculation of the days remaining for his birthday
            }
            response = this.orderBy( orderBy, direction, response ); //we order the response object with orderBy and direction
            this.elementsMaker( response )
        } )
    }

    /**
     * CRUD Put/Update Method
     * send update data to server with id and new data if we have
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
     * delete data from server
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
        let $alert = $( '#alert' );
        $alert.fadeOut() // Hide the matched elements by fading them to transparent.
        $( `<div class="mx-auto my-3 alert alert-${color}">` ).html( message ).appendTo( $alert )
        $alert.fadeIn(); //Display the matched elements by fading them to opaque.
        callback(); //callback function if we need
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
        $btn.off( 'click' ).on( 'click', function () {
            let $elem = $( this );
            this.data = {
                name:$elem.parent().parent().children( 'th' ).html(),
                geburtstag:$elem.parent().parent().children( 'td' ).html(),
            }
            switch ( $elem.attr( 'data-btn' ) ) { // check wish button was clicked
                case 'edit':// if the button is an Edit button then ==> PUT method
                    id = $elem.parent().parent().attr( 'id' ); // we take the id of the record we want to edit // the first parent is the <td> of this button, the second parent is <tr> and here we have the id of the record
                    _this.editElement( id, false )
                    break
                case 'delete': // if the button is a Delete button then ==> DELETE method
                    id = $elem.parent().parent().attr( 'id' ); // we take the id of the record we want to delete // the first parent is the <td> of this button, the second parent is <tr> and here we have the id of the record
                    _this.delete( id, this.data ); // call the delete method
                    break
                case 'put' :// if the button is an Edit button then ==> PUT method
                    id = $elem.parent().parent().attr( 'id' ); // we take the id of the record we want to delete // the first parent is the <td> of this button, the second parent is <tr> and here we have the id of the record
                    this.data = { // put the user input to this data
                        name:$elem.parent().parent().children( 'th' ).children( 'input' ).val(),
                        geburtstag:$elem.parent().parent().children( 'td' ).children( 'input' ).val(),
                    };
                    if ( this.data.name && this.data.geburtstag ) { // we control if data is not empty
                        _this.edit( id, this.data ); //all is ok then we edit the data
                    } else {
                        id = $elem.parent().parent().attr( 'id' );
                        _this.editElement( id, true ) // return to edit element with error is true
                    }
                    break
                case 'cancel' : // if the button is a Cancel button then ==> GET method
                    _this.getData();
                    break
                case 'create': // create button
                    this.data = { // put the user input to this data
                        name:$( '#nameInput' ).val(),
                        geburtstag:$( '#dateInput' ).val()
                    };
                    _this.inputController( this.data ); // call the inputController method
                    break
                default:
            }
        } )
    }

    //endregion

    //region OrderBy -- method
    /**
     * Object order by birthday or name (what in this sorted )
     * @param orderBy {string}
     * @param direction {string}
     * @param data {object}
     * @return {object}
     */
    orderBy( orderBy, direction, data ) {
        console.log(data)

        if ( direction === 'asc' && ( orderBy === 'name' || orderBy === 'geburtstag' ) ) {
            data.sort( ( a, b ) => ( a[ orderBy ] > b[ orderBy ] ) ? 1 : -1 )
        } else if ( direction === 'desc' && ( orderBy === 'name' || orderBy === 'geburtstag' ) ) {
            data.sort( ( a, b ) => ( a[ orderBy ] < b[ orderBy ] ) ? 1 : -1 )
        } else if ( direction === 'asc' && ( orderBy === 'age' || orderBy === 'birthday' ) ) {
            console.log( 'ici asc nombre ' + orderBy, data )
            data.sort( function ( a, b ) {
                return a[ orderBy ] - b[ orderBy ]
            } )
        } else {
            console.log( 'ici desc nombre ' + orderBy, data )
            data.sort( function ( a, b ) {
                return b[ orderBy ] - a[ orderBy ]
            } )
        }
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

        let age = new Date( birthday ).getUTCFullYear(); // the birthday is transformed in Date object then we take only the year (yyyy)
        age -= 1970; // Javascript date begin with 1970  then if we
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
        this.message = ''; //make it empty
        this.color = ''; //make it empty
        $( '#nameInput' ).val( '' ); //Clear the input name
        $( '#dateInput' ).val( '' ); //Clear the input date
    }

    //endregion
    /**
     * Delete alla record
     */
    deleteAllData() {
        for ( const dataKey in this.data ) {
            this.delete( this.data[ dataKey ].id, this.data )
        }
    };

    radioSorting() {
        let _this = this;
        let $radio = $( '.bi' );
        let $radioDown = $( "[data-sort = 'asc']" );
        let $radioUp = $( "[data-sort = 'desc']" );
        console.log( $radioDown, $radioUp, $radio )
        $radio.on( 'click', ( e ) => {
            let $this = $( e.target );
            let direction = $this.attr( 'data-sort' );
            let orderBy = $this.attr( 'data-name' )
            console.log( $this )
            if ( $this.hasClass( 'bi-caret-down-square' ) || $this.hasClass( 'bi-caret-up-square' ) ) {
                console.log( 'deja' )
                return false;
            } else {

                $radioDown.removeClass( 'bi-caret-down-square' )
                $radioDown.addClass( 'bi-caret-down' )
                $radioUp.removeClass( 'bi-caret-up-square' )
                $radioUp.addClass( 'bi-caret-up' )

                if ( direction === 'asc' ) {
                    $this.removeClass( ( 'bi-caret-down' ) )
                    $this.addClass( 'bi-caret-down-square' )
                } else {
                    $this.removeClass( 'bi-caret-up' )
                    $this.addClass( 'bi-caret-up-square' )
                }

                _this.getData( orderBy, direction );

            }

        } )

    }

    ///// Class End /////
}

crud = new Crud();
crud.getData();
crud.radioSorting();

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
    $( '.alert' ).fadeOut();
    $( '.loader' ).remove();
    // Add the div messages if we have °_°
    if ( crud.message ) { // check if message is not empty
        crud.messageAlert( crud.message, crud.color, () => { // the message remains only 3s then is deleted from the window
            setTimeout( () => {
                $( '.alert' ).fadeOut(); // close the alert
                crud.cleaner(); // make it empty
            }, 3000 );
            setTimeout( () => {
                $( '#alert' ).empty();
            }, 6000 )
        } );
    } // clear all after write is completed
    $( 'button' ).prop( 'disabled', false )
} )
//endregion
