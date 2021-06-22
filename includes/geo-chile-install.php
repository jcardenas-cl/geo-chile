<?php
/**
 * Funciones relacionadas especificamente a la instalación del plugin
 */
$region_posts = new WP_Query(['post_type' => 'geo-chile-region']);

if ( !$region_posts->have_posts() ) {
    foreach ( $initial_list_regiones as $region ) {
        $args = [
            'post_title'	=> wp_strip_all_tags($region['name']),
            'post_status'	=> 'publish',
            'post_content'	=> '',
            'post_type'		=> 'geo-chile-region'
        ];
        $post_ID = wp_insert_post( $args );
        if ( !is_wp_error($post_ID) ) {
            // Ajustar datos de cada post
        } else {
            //there was an error in the post insertion, 
            echo $post_ID->get_error_message();
            exit;
        }
    }
} else {
// Ya existen registros previos, asi que se omite la inserción
}
