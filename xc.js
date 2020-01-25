'use strict'

document.getElementsByClassName('tabs tabs-justified with-tab-contents')[0].style.display="flex";
for (i=0; i <= 4; i++) {
	document.getElementsByClassName('tabs tabs-justified with-tab-contents')[0].querySelectorAll('[role="tab"]')[i].style.flexGrow="1";  
	document.getElementsByClassName('tabs tabs-justified with-tab-contents')[0].querySelectorAll('[role="tab"]')[i].getElementsByClassName('tab')[0].style.paddingRight="0";
	document.getElementsByClassName('tabs tabs-justified with-tab-contents')[0].querySelectorAll('[role="tab"]')[i].getElementsByClassName('tab')[0].style.paddingLeft="0"; 
};

var ski_tab = '<li aria-controls="ski-goals" aria-selected="true" id="ski-goals-tab" role="tab"><div class="tab" data-sport="Nordic Ski"><span class="app-icon-wrapper"><span title="Ski Goal" class="app-icon icon-nordicski icon-dark icon-lg">Ski Goal</span></span></div></li>'

var card_wrapper = document.getElementsByClassName('tabs with-tab-contents')[0]
card_wrapper.innerHTML = ski_tab + card_wrapper.innerHTML
document.getElementById('ride-goals-tab').setAttribute('aria-selected', false)
document.getElementById('ride-goals').setAttribute('aria-hidden', true)

// document.getElementsByClassName('promo promo-fancy feed-entry card')[0].style.display='none';
document.getElementsByClassName('promo promo-fancy feed-entry card')[0].remove()
document.getElementsByClassName('upgrade')[0].style.display = 'none'

var original_card_content = document.getElementById('ride-goals')
var ski_card_content = original_card_content.cloneNode(true)
ski_card_content.setAttribute('id', 'ski-goals')
ski_card_content.setAttribute('data-sport', 'ski')
ski_card_content.setAttribute('aria-labelledby', 'ski-goals-tab')
ski_card_content.setAttribute('aria-hidden', false)

var year_goal_element = document.createElement('span')
ski_card_content.getElementsByClassName('card-body yearly-goal text-center')[0].prepend(year_goal_element)

document.getElementsByClassName('tab-contents')[0].appendChild(ski_card_content)

ski_card_content.getElementsByTagName('image')[0].setAttribute('href', chrome.extension.getURL('snowflake.png'))

var banner = document.getElementsByClassName('js-snw-goals-upsell media upsell');
banner[0].style.display = 'none'
banner[1].style.display = 'none'
banner[2].style.display = 'none'
banner[3].getElementsByClassName('media-left')[0].remove();
banner[3].getElementsByClassName('media-body pl-sm')[0].innerHTML = '<a style="cursor:pointer;">Setup you XC ski year goal</a>';
banner[3].getElementsByClassName('media-body pl-sm')[0].style.textAlign='center';
// banner[3].style.display = 'none'


var url = 'https://www.strava.com/athlete/training_activities?activity_type=NordicSki'
var pages
var i
var activities = []
var later_activity_local = 0
var later_activity_remote = 0
activities = JSON.parse(localStorage.getItem('nordicSki') || '[]')

let results = fetch(
  url, {
    method: 'GET',
    credentials: 'include',
    headers: {
	    	'accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
	    	'x-requested-with': 'XMLHttpRequest'
    }
  }
)
  .then((res) => {
    return res.json()
  })
  .then((data) => {
  	if (activities.length != 0) {
	  	activities.forEach(function (element) {
        if (element['id'] > later_activity_local) { later_activity_local = element['id'] }
      })
      data['models'].forEach(function (element) {
        if (element['id'] > later_activity_remote) { later_activity_remote = element['id'] }
      })
  		if (later_activity_local == later_activity_remote) { return 1 };
    }

    let promises = []
  			pages = Math.ceil(data['total'] / data['perPage'])
    for (i = pages; i > 0; i--) {
      promises.push(
        fetch(
          url + '&page=' + i, {
            method: 'GET',
            credentials: 'include',
            headers: {
						    	'accept': 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript',
						    	'x-requested-with': 'XMLHttpRequest'
            }
          }
        )
          .then((res) => {
            return res.json()
					    })
          .then((data) => {
					        return data['models']
					    })
          .catch(alert)
      )
    };
    let result = []
    result = Promise.all(promises)
			          .then((results) => {
			          	let result = []
			          	results.forEach(function (element) {
          result = result.concat(element)
        })
        localStorage.setItem('nordicSki', JSON.stringify(result))
        activities = JSON.parse(localStorage.getItem('nordicSki') || '[]')
        return result
      })
      .catch((e) => {
        console.log('alert')
      })
    return result
  })
  .catch(alert)

var prevMonday = new Date()
prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7)

var curYear = new Date().getFullYear()

var common_week_counter = 0
var days_week_counter = {'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0, 'Sun': 0 }
var elevation_gain = 0
var elevation_unit = ''
var moving_time = 0
var common_year_counter = 0

activities.forEach(function (element) {
  if (curYear === new Date(element['start_date']).getFullYear()) {
    common_year_counter = common_year_counter + element['distance_raw']
  }

  if (Date.parse(element['start_date']) >= Date.parse(prevMonday)) {
    common_week_counter = common_week_counter + element['distance_raw']
    elevation_gain = elevation_gain + element['elevation_gain_raw']
    elevation_unit = element['elevation_unit']
    moving_time = moving_time + element['moving_time_raw']
    switch (element['start_day']) {
		  case 'Mon': days_week_counter['Mon'] = days_week_counter['Mon'] + element['distance_raw'] / 1000; 
		  break
		  case 'Tue': days_week_counter['Tue'] = days_week_counter['Tue'] + element['distance_raw'] / 1000
		  break
		  case 'Wed': days_week_counter['Wed'] = days_week_counter['Wed'] + element['distance_raw'] / 1000
		  break
		  case 'Thu': days_week_counter['Thu'] = days_week_counter['Thu'] + element['distance_raw'] / 1000
		  break
		  case 'Fri': days_week_counter['Fri'] = days_week_counter['Fri'] + element['distance_raw'] / 1000
		  break
		  case 'Sat': days_week_counter['Sat'] = days_week_counter['Sat'] + element['distance_raw'] / 1000
		  break
		  case 'Sun': days_week_counter['Sun'] = days_week_counter['Sun'] + element['distance_raw'] / 1000
		  break
    }
  }
})
ski_card_content.getElementsByClassName('actual')[0].innerHTML = Math.round(common_week_counter / 10) / 100

var max_day = Object.keys(days_week_counter).reduce(function (a, b) { return days_week_counter[a] > days_week_counter[b] ? a : b })

for (const [key, value] of Object.entries(days_week_counter)) {
  days_week_counter[key] = Math.round(46 * days_week_counter[key] / days_week_counter[max_day])
}
var hours = ~~(moving_time / 3600)
var minutes = Math.round((moving_time - (~~(moving_time / 3600) * 3600)) / 60)

ski_card_content.getElementsByClassName('volume-bar-container')[0].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Mon'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[0].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Mon'])

ski_card_content.getElementsByClassName('volume-bar-container')[1].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Tue'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[1].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Tue'])

ski_card_content.getElementsByClassName('volume-bar-container')[2].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Wed'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[2].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Wed'])

ski_card_content.getElementsByClassName('volume-bar-container')[3].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Thu'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[3].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Thu'])

ski_card_content.getElementsByClassName('volume-bar-container')[4].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Fri'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[4].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Fri'])

ski_card_content.getElementsByClassName('volume-bar-container')[5].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Sat'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[5].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Sat'])

ski_card_content.getElementsByClassName('volume-bar-container')[6].getElementsByTagName('rect')[0].setAttribute('height', days_week_counter['Sun'] + 2)
ski_card_content.getElementsByClassName('volume-bar-container')[6].getElementsByTagName('rect')[0].setAttribute('y', 46 - days_week_counter['Sun'])

ski_card_content.getElementsByClassName('list-stats')[0].childNodes[3].innerHTML = Math.round(elevation_gain) + ' ' + elevation_unit

var t = ski_card_content.getElementsByClassName('list-stats')[0].childNodes[1].getElementsByTagName('abbr')
ski_card_content.getElementsByClassName('list-stats')[0].childNodes[1].innerHTML = hours + t[0].innerHTML + ' ' + minutes + t[1].innerHTML


ski_card_content.getElementsByClassName('media-body pl-sm')[0].onclick = function (e) {
  var modal = document.createElement('dialog')
  // get goal from storage
  modal.innerHTML = '<form><label>Set year goal<input type="number" min="0" step="1" value=0 style="margin:25px;"/></label><a class="btn btn-success btn-sm">Submit</a><a style="margin-left:15px;" class="btn btn-success btn-sm">Cancel</a></form>'
  ski_card_content.prepend(modal)
  modal.showModal()
  modal.getElementsByTagName('a')[1].onclick = function (e) {
  	    modal.close()
  }
  modal.getElementsByTagName('a')[0].onclick = function (e) {
    localStorage.setItem('nordicSkiYearGoal', ski_card_content.getElementsByTagName('input')[0].value)
    modal.close()
    let year_goal = localStorage.getItem('nordicSkiYearGoal') || '0'
    ski_card_content.getElementsByClassName('card-body yearly-goal text-center')[0].getElementsByTagName('span')[0].innerHTML = Math.round(common_year_counter / 1000) + ' km / ' + year_goal + ' km'
    location.reload()
  }
}

var year_goal = localStorage.getItem('nordicSkiYearGoal') || '0'
ski_card_content.getElementsByClassName('card-body yearly-goal text-center')[0].getElementsByTagName('span')[0].innerHTML = Math.round(common_year_counter / 1000) + ' km / ' + year_goal + ' km'

var progress_year_bar_shadow = ski_card_content.getElementsByClassName('card-body yearly-goal text-center')[0].getElementsByTagName('rect')[0].cloneNode(true)

progress_year_bar_shadow.setAttribute('class', 'progress-bar-container volume-bar highlighted')
ski_card_content.getElementsByClassName('card-body yearly-goal text-center')[0].getElementsByTagName('g')[0].appendChild(progress_year_bar_shadow)

if (year_goal == 0) { year_goal = 1 };
progress_year_bar_shadow.setAttribute('width', Math.round(common_year_counter * 248 / year_goal / 1000))
