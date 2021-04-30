/**
 * @helper converte uma duração em segundos para uma string no formato hh:mm:ss
 */
export default function convertDurationToTimeString(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const timeString = [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(':');

  return timeString;
}
