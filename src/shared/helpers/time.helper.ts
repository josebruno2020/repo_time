export class TimeHelper {
  static formatTotalSeconds(total: number): string {
    const sec_num = total;
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor((sec_num - hours * 3600) / 60);
    const seconds = sec_num - hours * 3600 - minutes * 60;

    return (
      hours.toString().padStart(2, '0') +
      ':' +
      minutes.toString().padStart(2, '0') +
      ':' +
      seconds.toString().replace('.', '').substring(0, 2).padStart(2, '0')
    );
  }

  static setTotalSeconds(
    hours: number,
    minutes: number,
    seconds: number,
  ): number {
    return hours * 3600 + minutes * 60 + seconds;
  }
}
