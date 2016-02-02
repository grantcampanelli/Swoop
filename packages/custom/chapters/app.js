'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Chapters = new Module('chapters');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Chapters.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Chapters.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  //Chapters.menus.add({
  //  title: 'Chapters',
  //  link: 'chapters example page',
  //  roles: ['authenticated'],
  //  menu: 'main'
  //});

  Chapters.menus.add({
    'roles': ['authenticated'],
    'title': 'Chapters',
    'link': 'all chapters'
  });

  Chapters.aggregateAsset('css', 'chapters.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Chapters.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Chapters.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Chapters.settings(function(err, settings) {
        //you now have the settings object
    });
    */
  //swagger.add(__dirname);

  return Chapters;
});
