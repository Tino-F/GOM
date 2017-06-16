"use strict";

const $j = jQuery.noConflict();
let slid = false;
let menu, menuContent;

function slide () {

  if ( !slid ) {

    menu.addClass('slide-menu');
    let nav_links = document.querySelectorAll('.item_inner > span');
    for(let i = 0; i < nav_links.length; i++)
      nav_links[i].className += ' change-color';
    document.getElementsByClassName('full_section_inner')[0].className += ' slide-other';
    slid = true;

  }

};

function load_content ( url ) {

  if ( !slid ) {

    $j.ajax({
      url: url,
      success: ( content ) => {

        menuContent.html( content );
        slide();

      },
      error: ( err ) => {

        menuContent.html( '<h1>Server error.</h1><p>' + err + '</p>' );
        slide();

      }
    });

  } else {

    menuContent.fadeOut();

    $j.ajax({
      url: url,
      success: ( content ) => {

        menuContent.html( content );
        menuContent.fadeIn();

      },
      error: ( err ) => {

        menuContent.html( '<h1>Server error.</h1><p>' + err + '</p>' );
        menuContent.fadeIn();

      }
    });

  }

};

window.onload =  () => {

  menu = $j( '<div>', { id: 'the_main_menu' } );
  menuContent = $j( '<div>', { id: 'menu-ajax-content' } );
  menu.css( { 'position':'fixed', 'left':'100%', 'width':'50%', 'min-height':'100%', 'background':'white', 'padding-top':'200px', 'text-align':'center' } );
  menuContent.css( { 'overflow-y':'scroll', 'width': '100%' } );
  menu.append( menuContent );

  let links = document.querySelectorAll('.menu-item');

  for( let i = 0; i < links.length; i++ ) {

    links[i].addEventListener('click', ( e ) => {

      let element = e.target || e.srcElement;
      let url = 'http://graysonmain.com/WP/' + element.textContent.replace( /&/, '-' ).toLowerCase();
      load_content( url )
      console.log( 'Loading ', url + '...' );

    });

  }

  $j('a').attr('href','#');
  $j('.main_menu').prepend( menu );
  load_content( 'http://graysonmain.com/' );

};
