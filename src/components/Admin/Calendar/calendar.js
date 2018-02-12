import moment from 'moment'

import eventPopUp from './eventPopUp.vue'
import event from './event.vue'

const dateToday = new Date()

export default {
  props: ['events'],
  /* 'Events' prop must be an array of objects
  with the following attributes:
  Start date, end date,
  and a custom 'content' object inside,
  that contains whatever other key-attribute pairs
  are desired to be displayed in the pop-up.
  'End date' is not required. */

  data () {
    return {
      // Variables
      currentYear: dateToday.getFullYear(),
      currentMonth: dateToday.getMonth(),

      daysFromPrevMonth: 0,
      daysFromNextMonth: 0,

      eventPopUpDisplayed: false,
      eventPopUpStylePosition: '',

      selectedDate: '',
      selectedEventData: '',

      newEventPlaceholder: null,

      // Store pre-saved event here
      newEventStashed: null,

      // Constants
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
    currentMonth() {
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

    catchClickOnDay(e) {
      const date = this.getDateFromClickEvent(e)
    },


    catchDblClickOnDay(e) {
      /* Creates newEventPlaceholder. When the day is double-clicked, the event pop-up
      comes up after emit function in event's mounted() method */

      this.newEventPlaceholder = null
      this.selectedEventData = {}

      const { dayNum, monthNum, year } = this.getDateFromClickEvent(e)

      const momentObj = moment({
        day: dayNum,
        month: monthNum,
        year: year,
        // Set to max time so it is last in list
        // (this is also req'd for the pop-up to show
        // when there is already events that day)
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999,
      })

      const newEventPlaceholder = {
        startDate: momentObj.format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        momentObj,
        type: 'eventPlaceholder',
      }

      this.setSelectedDateFromMomentObj(momentObj)

      this.newEventPlaceholder = newEventPlaceholder
    },


    catchDblClickOnEvent(eventData) {
      this.selectedEventData = eventData

      // To send selected date to event pop-up
      this.setSelectedDateFromMomentObj(eventData.momentObj)

      // Set position of pop-up
      this.setEventPopUpPositionFromElement(eventData.el)

      this.eventPopUpDisplayed = true
    },


    setSelectedDateFromMomentObj(momentObj) {
      this.selectedDate = {
        dayNum: momentObj.format('DD'),
        dayNumOrd: momentObj.format('Do'),
        dayName: momentObj.format('dddd'),
        monthNum: momentObj.month(),
        monthName: momentObj.format('MMMM'),
        year: momentObj.year(),
      }
    },


    handleNewEventPlaceholderCreation(newEventData) {
      this.setEventPopUpPositionFromElement(newEventData.el)
      this.eventPopUpDisplayed = true
    },


    getDateFromClickEvent(e) {
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


    getEventsForDay(dayNum, monthNum, year) {
      // The day that the calendar is building
      const thisDate = moment({ day: dayNum, months: monthNum, year: year }).format('DD-MM-YYYY')
      const eventsForDay = [];

      // Concat newEventPlaceholder and newEventStashed if they exist
      let tmpEvents = this.events
      tmpEvents = this.newEventPlaceholder ? tmpEvents.concat([this.newEventPlaceholder]) : tmpEvents
      tmpEvents = this.newEventStashed ? tmpEvents.concat([this.newEventStashed]) : tmpEvents

      /* Loop through the events to see if they match this day,
      and push them if they match */
      tmpEvents.forEach(event => {

        const momentObj = event.momentObj ? event.momentObj : moment(event.startDate)
        if (thisDate === momentObj.format('DD-MM-YYYY')) {
          const eventData = {
            momentObj: momentObj,
            startTime: momentObj.format('hh:mm a'),
            endTime: momentObj.format('hh:mm a'),
            content: event.content,
            type: event.type ? event.type : 'existingEvent',
          }
          eventsForDay.push(eventData)
        }
      })

      // Sort by event startTime using momentjs
      eventsForDay.sort((a, b) => {
        if (a.momentObj.isBefore(b.momentObj)) { return -1 }
        if (a.momentObj.isAfter(b.momentObj)) { return 1 }
        return 0;
      })

      return eventsForDay
    },


    setEventPopUpPositionFromElement(element) {
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element
      const top = offsetTop + element.offsetParent.offsetTop
      const left = offsetLeft + element.offsetParent.offsetLeft
      this.eventPopUpStylePosition = `top: ${top - 201 + (offsetHeight / 2)}px; left: ${left + offsetWidth}px;`
    },


    hidePopUpAfterClickOutsidePopUp() {
      this.eventPopUpDisplayed = false
      this.newEventPlaceholder = null
    },


    hidePopUpAfterClickOkay() {
      this.eventPopUpDisplayed = false
      this.newEventPlaceholder = null
    },


    handleClickOkayInPopUp(newEventData) {
      this.hidePopUpAfterClickOkay()

      // For stashing (pre-saving) event in calendar and
      // visual display of that stashed event
      const {
        dayNum,
        monthNum,
        year,
      } = newEventData.date

      const {
        startTime: sT,
        endTime: eT,
        content,
      } = newEventData

      const momentObj = moment({
        day: dayNum,
        months: monthNum,
        year: year,
        hour: Number(sT.hh) + (sT.a === 'am' ? 0 : 12),
        minute: sT.mm,
      })

      // Format stashed event for event component
      const newEventStashed = {
        startTime: `${sT.hh}:${sT.mm} ${sT.a}`,
        endTime: `${eT.hh}:${eT.mm} ${eT.a}`,
        momentObj,
        content,
        type: 'stashedEvent'
      }

      this.newEventStashed = newEventStashed

      // For emitting event to parent, start/end dates are converted to ISO format
      console.log("newEventData", newEventData)

      const newEvent = {
        startDate: moment({
          day: newEventData.date.dayNum,
          month: newEventData.date.monthNum,
          year: newEventData.date.year,
          hour: Number(newEventData.startTime.hh) + (newEventData.startTime.a === 'pm' ? 12 : 0),
          minute: newEventData.startTime.mm,
          second: 0,
          millisecond: 0,
        }).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),


        endDate: moment({
          day: newEventData.date.dayNum,
          month: newEventData.date.monthNum,
          year: newEventData.date.year,
          hour: Number(newEventData.endTime.hh) + (newEventData.endTime.a === 'pm' ? 12 : 0),
          minute: newEventData.endTime.mm,
          second: 0,
          millisecond: 0,
        }).format('YYYY-MM-DDTHH:mm:ss.SSSZ'),


        date: newEventData.date,
        description: newEventData.description,
        address: newEventData.address,
        adminNotes: newEventData.adminNotes,
        phone: newEventData.phone,
        email: newEventData.email,
      }

      this.$emit('emit-event-data', newEvent)
    },
  },


  mounted() {
    this.initializeMonthData()
  },
}