import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { RobotaFindDto } from './dto/robota.dto';
import { API_ERRORS, USE_CASES } from './robota.constants';
import { RobotaData } from '../top-page/models/top-page.model';

@Injectable()
export class RobotaService {
  constructor(private readonly httpService: HttpService) {}

  async getData(text: string) {
    try {
      const { data } = await this.httpService.axiosRef.get<RobotaFindDto>(
        USE_CASES.search,
        {
          params: {
            keyWords: text,
            noSalary: false,
          },
        },
      );
      return this.parseDate(data);
    } catch (e) {
      Logger.error(e);
      throw new HttpException(
        API_ERRORS.SOMETHING_WRONG,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private parseDate(data: RobotaFindDto): RobotaData {
    const salaryArray = data.documents
      .map((el) => el.salaryFrom)
      .filter((salary) => salary !== 0);
    const count = salaryArray.length;
    const juniorSalary = Math.min(...salaryArray);
    const middleSalary = Math.round(
      salaryArray.reduce((acc, item) => acc + item, 0) / count,
    );
    const seniorSalary = Math.max(...salaryArray);
    return {
      count,
      juniorSalary,
      middleSalary,
      seniorSalary,
      updatedAt: new Date(),
    };
  }
}
