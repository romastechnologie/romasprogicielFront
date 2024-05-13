import { ref } from "vue"
let eventGuid: any = 0
const todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
    {
        id: createEventId(),
        title: 'All-day event',
        start: todayStr
    },
    {
        id: createEventId(),
        title: 'Timed event',
        start: todayStr + 'T12:00:00'
    },

    {
        id: createEventId(),
        title: "All-day event",
        start: '2024-01-02',
        end: '2024-01-04'
    },
    {
        id: createEventId(),
        title: "event",
        date: "2024-02-03"
    },
    {
        id: createEventId(),
        title: "event 2",
        start: '2024-01-07',
        end: '2024-01-09'
    },
    {
        id: createEventId(),
        title: "all-day event",
        start: '2024-11-09T10:30:00',
        end: '2024-11-10T12:30:00'
    },
    {
        id: createEventId(),
        title: "event",
        date: "2024-02-10"
    },
    {
        id: createEventId(),
        title: "event2",
        date: "2024-01-12"
    },
    {
        id: createEventId(),
        title: "event",
        start: "2024-01-19",
        end: "2024-01-22"
    },
    {
        id: createEventId(),
        title: "event",
        date: "2024-01-10",
    },
    {
        id: createEventId(),
        title: "event",
        date: "2024-02-06",
    },
    {
        id: createEventId(),
        title: "All Day event",
        date: "2024-03-06",
    },
    {
        id: createEventId(),
        title: "BirthDay Party",
        date: "2024-02-22",
    },
    {
        id: createEventId(),
        title: "4p meeting",
        date: "2024-01-11",
    },
    {
        id: createEventId(),
        title: "3:30p meeting",
        date: "2024-02-05",
    },
    {
        id: createEventId(),
        title: "Tour with our team ",
        date: "2024-02-16",
    },
    {
        id: createEventId(),
        title: "4p meeting ",
        date: "2024-02-03",
    },
    {
        id: createEventId(),
        title: "event3",
        date: "2024-02-06",
    },
    {
        id: createEventId(),
        title: "4p meeting",
        date: "2024-01-22",
    },
    {
        id: createEventId(),
        title: "event1",
        date: "2024-02-22",
    },
    {
        id: createEventId(),
        title: "3:30p meeting",
        date: "2024-01-23",
    },
    {
        id: createEventId(),
        title: "3:30p meeting",
        date: "2024-01-27",
    },
    {
        id: createEventId(),
        groupId: 999,
        title: 'Meeting with Team',
        start: '2022-02-11T16:00:00'
    },
    {
        id: createEventId(),
        groupId: 999,
        title: 'Upload New Project',
        start: '2024-02-16T16:00:00'
    },
    {
        id: createEventId(),
        title: 'Birthday Party',
        start: '2024-11-24',
        end: '2024-03-26'
    },
    {
        id: createEventId(),
        title: 'Reporting about Theme',
        start: '2024-03-18T10:30:00',
        end: '2024-03-19T12:30:00'
    },
    {
        id: createEventId(),
        title: 'Lunch',
        start: '2024-02-28T12:00:00'
    },
    {
        id: createEventId(),
        title: 'Meeting',
        start: '2024-04-12T14:30:00'
    },
    {
        id: createEventId(),
        title: 'Happy Hour',
        start: '2024-04-24T17:30:00'
    },
]

export function createEventId() {
    return String(eventGuid++)
}
