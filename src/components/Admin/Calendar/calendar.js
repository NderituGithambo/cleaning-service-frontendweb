import moment from 'moment'

import eventPopUp from './eventPopUp.vue'
import event from './event.vue'

export default {
  props: ['events'],
  /* 'Events' prop must be an array of objects
  with the following attributes:
  Start date, end date, title,
  and a custom 'content' object inside,
  that contains whatever other key-attribute pairs
  are desired to be displayed in the pop-up.
  'End date' is not required. */

  data () {
    return {
      // variables
      currentYear: 2018,
      currentMonth: 0,
      daysFromPrevMonth: 0,
      daysFromNextMonth: 0,
      eventPopUpDisplayed: false,
      eventPopUpStylePosition: '',
      currentDateSelected: '',
      newEventPlaceholder: [],
      selectedEventData: '',


      // constants
      DAY_NAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      MONTH_NAMES: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December']
    }
  },



  components: {
    'event-pop-up': eventPopUp,
    'event': event,
  },



  watch: {
    currentMonth: function() {
      // Adjust displayed days in calendar when changing months
      this.initializeMonthData()
    },
  },



  methods: {
    /*
    ===============
    Calendar Layout
    ===============
    */

    getDaysInFebByYear: function(year) {
      if (year % 100 === 0 && year % 400 !== 0) return 28
      else if (year % 4 === 0) return 29
      return 28
    },


    getDayNumsOfMonthsByYear: function(year) {
      return [31, this.getDaysInFebByYear(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    },


    getDayNameByDayMonthYear: function(dayNum, monthNum, year) {
      return moment({ day: dayNum, months: monthNum, year: year }).format('dddd')
    },


    getDayNumberInWeekByDayMonthYear: function(dayNum, monthNum, year) {
      return moment({ day: dayNum, months: monthNum, year: year }).day()
    },


    getAdjacentMonthNumAndYearChange: function(monthDiff) {
      if ((this.currentMonth + monthDiff) < 0) {
        // If December of previous year
        return { newMonthNum: 11, yearChange: -1 }
      } else if ((this.currentMonth + monthDiff) > 11) {
        // If January of next year
        return { newMonthNum: 0, yearChange: 1 }
      } else {
        // If adjacent month in current year
        return { newMonthNum: this.currentMonth + monthDiff, yearChange: 0 }
      }
    },


    dayStyleClass(monthDiff) {
      return 'day ' + (monthDiff ? 'day-adjacent-month' : 'day-current-month')
    },


    getDaysOfMonthData(monthDiff) {
      // Prev / next month adjustments:
      let monthNum = this.currentMonth
      let year = this.currentYear
      if (monthDiff) {
        const { newMonthNum, yearChange } = this.getAdjacentMonthNumAndYearChange(monthDiff)
        monthNum = newMonthNum
        year += yearChange
      }
      const numDays = this.getDayNumsOfMonthsByYear(year)[monthNum]
      const startDay = monthDiff < 0 ? numDays - this.daysFromPrevMonth + 1 : 1
      const endDay = monthDiff > 0 ? this.daysFromNextMonth : numDays

      // Populate array of days
      const dayData = []
      for (let dayNum = startDay; dayNum <= endDay; dayNum++) {
        dayData.push({
          dayNum: dayNum,
          dayName: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
          monthNum: monthNum,
          monthName: this.MONTH_NAMES[monthNum],
          monthDiff: monthDiff,
          year: year,
          events: this.getEventsForDay(dayNum, monthNum, year)
        })
      }
      return dayData
    },


    displayedDays() {
      // Used in html rendering, v-for loop
      return this.getDaysOfMonthData(-1).concat(
        this.getDaysOfMonthData(),
        this.getDaysOfMonthData(1),
      )
    },


    navMonth(change) {
      let monthNum = this.currentMonth
      monthNum += change
      if (monthNum < 0) {
        monthNum = 11
        this.currentYear -= 1
      }
      else if (monthNum > 11) {
        monthNum = 0
        this.currentYear += 1
      }
      this.currentMonth = monthNum
    },


    initializeMonthData() {
      // How many days to display from the previous month before first day in current month
      this.daysFromPrevMonth = this.getDayNumberInWeekByDayMonthYear(
        1,
        this.currentMonth,
        this.currentYear
      )
      // How many days to display from the next month after last day in current month
      const daysInThisMonth = this.getDayNumsOfMonthsByYear(this.currentYear)[this.currentMonth]
      this.daysFromNextMonth = 13 - this.getDayNumberInWeekByDayMonthYear(
        daysInThisMonth,
        this.currentMonth,
        this.currentYear
      )
      // To keep the same amount of rows in the calendar all the time
      if (this.daysFromPrevMonth + daysInThisMonth + this.daysFromNextMonth > 42) {
        this.daysFromNextMonth -= 7
      }
    },



    /*
    =============================
    Calendar Events & Interaction
    =============================
    */

    catchClickOnDay: function(event) {
      const date = this.getDateFromClickEvent(event)
    },


    getDateFromClickEvent: function(e) {
      const dayNum = e.currentTarget.getAttribute('dayNum')
      const monthNum = e.currentTarget.getAttribute('monthNum')
      const year = e.currentTarget.getAttribute('year')
      const date = {
        dayNum: Number(dayNum),
        dayName: this.getDayNameByDayMonthYear(dayNum, monthNum, year),
        monthNum: Number(monthNum),
        monthName: this.MONTH_NAMES[monthNum],
        year: Number(year)
      }
      return date
    },


    getEventsForDay: function(dayNum, monthNum, year) {
      const thisDate = moment({ day: dayNum, months: monthNum, year: year })
      const eventsForDay = [];
      this.events.concat(this.newEventPlaceholder).forEach(function(event) {
        const eventDate = moment(event.startDate)
        if (thisDate.format('DD-MM-YYYY') === eventDate.format('DD-MM-YYYY')) {
          const eventData = {
            moment: eventDate,
            startTime: eventDate.format('hh:mm a'),
            endTime: eventDate.format('hh:mm a'),
            title: event.title,
            content: event.content,
          }
          eventsForDay.push(eventData)
        }
      })

      // Sort by event startTime using momentjs
      eventsForDay.sort((a, b) => {
        if (a.moment.isBefore(b.moment)) { return -1 }
        if (a.moment.isAfter(b.moment)) { return 1 }
        return 0;
      })

      return eventsForDay
    },


    catchDblClickOnDay: function(e) {
      /* When the day is double-clicked, the event pop-up comes up
      after emit function in event's mounted() method */
      const { dayNum, monthNum, year } = this.getDateFromClickEvent(e)
      /* The latest possible time in day ensures that new event box
      shows up last in the event list */
      const newEvent = {
        startDate: moment({
          day: dayNum,
          month: monthNum,
          year: year,
          hour: 23,
          minute: 59,
          second: 59,
          millisecond: 59,
        }).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        title: 'newEvent',
      }
      this.newEventPlaceholder.push(newEvent)
    },


    openPopUpWithEventData(eventData) {
      this.selectedEventData = eventData

      const { moment } = eventData
      this.currentDateSelected = {
        dayNum: moment.format('Do'),
        dayName: moment.format('dddd'),
        monthNum: moment.month(),
        monthName: moment.format('MMMM'),
        year: moment.year(),
      }

      // For events about to be created...
      if (!eventData.content) {
        // Preferred time display on new events (0:00 am)
        this.selectedEventData = {
          startTime: '00:00 am',
          endTime: '00:00 am',
        }
      }

      // Set position of pop-up
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = eventData.el
      const top = offsetTop + eventData.el.offsetParent.offsetTop
      const left = offsetLeft + eventData.el.offsetParent.offsetLeft
      this.setEventPopUpPosition(top, left, offsetHeight, offsetWidth)

      this.eventPopUpDisplayed = true
    },


    setEventPopUpPosition(top, left, boxHeight, boxWidth) {
      this.eventPopUpStylePosition = `top: ${top - 201 + (boxHeight / 2)}px; left: ${left + boxWidth - 23}px;`
    },


    hideMenus: function() {
      this.eventPopUpDisplayed = false
      this.newEventPlaceholder = []
    },


    emitNewEventDataToParent: function(newEventData) {
      this.$emit('save-new-event', newEventData)
    },
  },


  mounted() {
    this.initializeMonthData()
  },
}