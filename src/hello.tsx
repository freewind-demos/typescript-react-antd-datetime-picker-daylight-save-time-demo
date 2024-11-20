import { Button, DatePicker, Space, Typography } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { useState } from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

const { Text } = Typography;
const TIMEZONE = 'America/New_York';

export function Hello() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const showDaylightTime = () => {
    // 使用UTC时间创建，然后转换到美东时间
    // 2024-07-15 14:00:00 UTC
    const utcTime = '2024-07-15 14:00:00';
    console.log('夏令时演示：');
    console.log('1. UTC时间：', utcTime);

    // 方式1：直接使用timezone转换（会自动处理夏令时）
    const dstDate = dayjs.utc(utcTime).tz(TIMEZONE);
    console.log('2. 转换到美东时间（自动处理夏令时）：', dstDate.format('YYYY-MM-DD HH:mm:ss'));

    // 方式2：手动减5小时（不考虑夏令时）
    const manualDate = dayjs.utc(utcTime).subtract(5, 'hour');
    console.log('3. 手动转换（固定UTC-5）：', manualDate.format('YYYY-MM-DD HH:mm:ss'));

    setSelectedDate(dstDate);
  };

  const showStandardTime = () => {
    // 使用UTC时间创建，然后转换到美东时间
    // 2024-01-15 14:00:00 UTC
    const utcTime = '2024-01-15 14:00:00';
    console.log('标准时间演示：');
    console.log('1. UTC时间：', utcTime);

    // 方式1：直接使用timezone转换（会自动处理夏令时）
    const stdDate = dayjs.utc(utcTime).tz(TIMEZONE);
    console.log('2. 转换到美东时间（自动处理夏令时）：', stdDate.format('YYYY-MM-DD HH:mm:ss'));

    // 方式2：手动减5小时（不考虑夏令时）
    const manualDate = dayjs.utc(utcTime).subtract(5, 'hour');
    console.log('3. 手动转换（固定UTC-5）：', manualDate.format('YYYY-MM-DD HH:mm:ss'));

    setSelectedDate(stdDate);
  };

  const getUtcOffset = () => {
    if (!selectedDate) return null;
    const offset = selectedDate.utcOffset() / 60;
    return offset;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space align="start">
          <div>
            <DatePicker
              showTime={{ format: 'HH:mm:ss' }}
              format="YYYY-MM-DD HH:mm:ss"
              value={selectedDate}
              onChange={handleDateChange}
              style={{ width: '250px' }}
            />
          </div>
          <div>
            <Text>时区：美国东部时间 ({TIMEZONE})</Text>
            {selectedDate && (
              <>
                <br />
                <Text>UTC 时间：{selectedDate.utc().format('YYYY-MM-DD HH:mm:ss')}</Text>
                <br />
                <Text>UTC 偏移：{getUtcOffset()} 小时</Text>
              </>
            )}
          </div>
        </Space>

        <Space>
          <Button onClick={showDaylightTime}>
            显示夏令时时间（7月）
          </Button>
          <Button onClick={showStandardTime}>
            显示标准时间（1月）
          </Button>
        </Space>

        <Text type="secondary">
          说明：美国东部标准时间（EST）是 UTC-5，
          在夏令时期间（3月至11月）会调快1小时变为 UTC-4。
          请查看控制台输出来了解时间转换的细节。
        </Text>
      </Space>
    </div>
  );
}
