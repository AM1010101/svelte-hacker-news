let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

export function parseDate(date: number){
    return new Date(Math.floor(date * 1000)).toLocaleString(
        undefined,
        options
      )
}

export function parseDateRelative(date: number){

// Calculate the difference in seconds between the current timestamp and the input timestamp
let differenceInSeconds = Math.floor(Date.now()/1000) - (date);

    // Define time intervals in seconds
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    // Iterate through intervals to find the appropriate unit and value
    for (let interval in intervals) {
        if (differenceInSeconds >= intervals[interval]) {
            const value = Math.floor(differenceInSeconds / intervals[interval]);
            return `${value} ${interval}${value !== 1 ? 's' : ''} ago`;
        }
    }

    return "Just now"; // If the timestamp is very recent
}