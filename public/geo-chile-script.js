jQuery( 'document' ).ready( function() {
    
    jQuery( '.cbo-geo-chile-region' ).change( function() {
        if ( jQuery( '.cbo-geo-chile-provincia' ).size() > 0 ) {
            const region_id = jQuery( this ).val();
            if ( region_id > 0 ) {
                jQuery.post( site_config.ajaxurl, {
                    'action': 'get_province_list',
                    'region_id': region_id,
                }, function( response ) {
                    jQuery( '.cbo-geo-chile-provincia' ).html( '<option value="-1">- Seleccione una provincia -</option>' );
                    response.map( function( item ) {
                        jQuery( '.cbo-geo-chile-provincia' ).append( `<option value="${item.id}">${item.name}</option>` );
                    });
                });
            } else {
                jQuery( '.cbo-geo-chile-provincia' ).html( '<option value="-1">- Seleccione una provincia [as] -</option>' );
            }
        } else {
            // en caso que no haya un cbo provincias, se obtendra la lista de comunas, si es que existe el select
            if ( jQuery( '.cbo-geo-chile-comuna' ).size() > 0 ) {
                const region_id = jQuery( this ).val();
                jQuery.post( site_config.ajaxurl, {
                    'action': 'get_commune_list',
                    'region_id': region_id,
                }, function( response ) {
                    jQuery( '.cbo-geo-chile-comuna' ).html( '<option value="-1">- Seleccione una comuna -</option>' );
                    response.map( function( item ) {
                        jQuery( '.cbo-geo-chile-comuna' ).append( `<option value="${item.id}">${item.name}</option>` );
                    });
                });
            }
        }
    } );
    
    jQuery( '.cbo-geo-chile-provincia' ).change( function() {
        const province_id = jQuery( this ).val();
        jQuery.post( site_config.ajaxurl, {
            'action': 'get_commune_list',
            'province_id': province_id,
        }, function( response ) {
            jQuery( '.cbo-geo-chile-comuna' ).html( '<option value="-1">- Seleccione una comuna -</option>' );
            response.map( function( item ) {
                jQuery( '.cbo-geo-chile-comuna' ).append( `<option value="${item.id}">${item.name}</option>` );
            });
        });
    });
} );