'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Events = new Module('events');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Events.register(function(app, auth, database, circles, swagger) {

  //We enable routing. By default the Package Object is passed to the routes
  Events.routes(app, auth, database);

  Events.aggregateAsset('css', 'events.css');

  
  //We are adding a link to the main menu for all authenticated users
  Events.menus.add({
    'roles': ['authenticated'],
    'title': 'Events',
    'link': 'all events'
  });
  Events.menus.add({
    'roles': ['authenticated'],
    'title': 'Create New Event',
    'link': 'create event'
  });

  Events.events.defaultData({
    type: 'post',
    subtype: 'event'
  });


  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Events.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Events.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    Events.settings(function (err, settings) {
      //you now have the settings object
    });
    */

  // Only use swagger.add if /docs and the corresponding files exists
  swagger.add(__dirname);
	
  return Events;
});
