const PollData = 'poll';

export const getPoll = () => localStorage.getItem(PollData);

export const setPoll = poll => localStorage.setItem(PollData, poll);

export const removePoll = () => localStorage.removeItem(PollData);

export default {
  setPoll,
  removePoll,
  getPoll,
};
