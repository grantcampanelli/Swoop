'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Chapters = new Module('chapters');

//var MembersModel = require('../members/server/models/members.js');


/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Chapters.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Chapters.routes(app, auth, database);

  //var MembersModel = database.connection.model('Member');
  
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
    'link': 'all chapters',
    'menu': 'main'
  });

  Chapters.menus.add({
    'roles': ['authenticated'],
    'title': 'Members',
    'link': 'all members',
    'menu': 'main'
  });

  Chapters.menus.add({
    'roles': ['authenticated'],
    'title': 'Events',
    'link': 'all events'
  });
  //Chapters.menus.add({
  //  'roles': ['can create content'],
  //  'title': 'Create Event',
  //  'link': 'create event'
  //});

  Chapters.menus.add({
    'roles': ['authenticated'],
    'title': 'GPA',
    'link': 'all gradeaverages'
  });

  Chapters.menus.add({
    'roles': ['authenticated'],
    'title': 'Service',
    'link': 'all services'
  });

  Chapters.events.defaultData({
    type: 'post',
    subtype: 'event'
  });

  //Chapters.menus.add({
  //  'roles': ['authenticated'],
  //  'title': 'New Member',
  //  'link': 'create member',
  //  'menu' : 'main'
  //});

  Chapters.aggregateAsset('css', 'chapters.css');
  Chapters.angularDependencies(['ngSanitize', 'ngCsv', 'chart.js', 'xeditable']);


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
