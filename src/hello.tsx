import React, { useState } from 'react';
import { Alert, DatePicker, Space, Button } from 'antd';
import type { Dayjs } from 'dayjs';

export function Hello() {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    console.log('选择的日期时间:', date?.format('YYYY-MM-DD HH:mm:ss'));
  };

  const handleClear = () => {
    setSelectedDate(null);
  };

  return (
    <Space direction="vertical">
      <Space>
        <DatePicker 
          showTime 
          placeholder="请选择日期和时间"
          onChange={handleDateChange}
          value={selectedDate}
        />
        <Button onClick={handleClear}>清除</Button>
      </Space>
      {selectedDate && (
        <Alert 
          message={`您选择的时间是: ${selectedDate.format('YYYY-MM-DD HH:mm:ss')}`} 
          type="success" 
        />
      )}
    </Space>
  );
}
