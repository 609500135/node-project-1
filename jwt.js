const jwt = require('jsonwebtoken');

// 定义负载 data
const payload = {
  name: '张三',
  age: 18,
  isAdmin: true
}

// 定义一个秘钥 secret
const secret = 'MY_GOD';

// 生成了 token
const token = jwt.sign(payload, secret);
console.log(token);

// 验证token
jwt.verify('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDgyMTMyNzAsInVzZXJfaWQiOiI3ODhiZjFlZDA2ZWY0OTI5YTRhMWNlZDVmNDhjMDAxOSIsInVzZXJfbmFtZSI6IjE3NjAzMDY1Mjc2IiwianRpIjoiMzZmMDBiNWItOGFjNy00OTk5LWJlNWUtMjI3NWVmZTZjZWQyIiwiY2xpZW50X2lkIjoic2VydmljZS11c2VyIiwic2NvcGUiOlsic2VydmljZSJdfQ.GLZzkqtHjr7-mi88if3HeJVvQEQdluTOWhwYbKo8AdCeQBHKq1WyekaYSrh1-PSkyIkXdX8d3KHN7qOf4mUQ46Cm0AgDRFFAciQESbvQfUsK16QBOj90T5tRPj3OoKgbzJqxcEnWiXPlrJ9XoXZc2KnTJelcBYAz3xwKDJov2yM4XuNcmVfkS-ojGCBkpMhTaSn2I_-Z-gvI_E2B26cM84jicROZ-SXpzePgs5vkGCXFyn3GiSFICPXyv-RYW-AYn6ja1v1EjUYV-P6F05KEy2ahL_76TZWg86Qon8aewfmief0sh_C5tgzMaY47NU8xVlxcAynZhfAbU6nZI6upLg', secret, function(error, data) {
  if (error) {
    console.log(error.message); // 验证不通过
    return;
  }

  console.log(data);
})