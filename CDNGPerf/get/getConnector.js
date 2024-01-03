import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');

export default function () {
  const url = 'https://qa.xxxx.io/gateway/ng/api/connectors/stats?routingId=zEaak-FLS425IEO7OLzMUg&accountIdentifier=zEaak-FLS425IEO7OLzMUg';
  const params = {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoVG9rZW4iOiI2M2ZjNWQ0NDZlNmJjYjIwMGQ4MzJjNWMiLCJpc3MiOiJIYXJuZXNzIEluYyIsImV4cCI6MTY3NzgzNTcxNSwiZW52IjoiZ2F0ZXdheSIsImlhdCI6MTY3Nzc0OTI1NX0.scjR0Zjai-hi-iGcbI-23uZK3Q095QKuBZVFamJ1yaQ',
      'Content-Type': 'application/json',
    },
  };
  check(http.get(url, params), {
    'status is 200': (r) => r.status == 200,
  }) || errorRate.add(1);
}
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}

