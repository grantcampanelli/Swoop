'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Chapter = new Module('chapter');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Chapter.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Chapter.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Chapter.menus.add({
    title: 'Chapter Dashboard',
    link: 'chapter dashboard',
    roles: ['authenticated'],
    menu: 'main'
  });
  
  Chapter.aggregateAsset('css', 'chapter.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Chapter.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Chapter.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Chapter.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Chapter;
});
