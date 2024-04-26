import http from 'k6/http';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/2.4.0/dist/bundle.js";
import { check } from 'k6';
import { Rate } from 'k6/metrics';

export const errorRate = new Rate('errors');
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2'], // 95% of requests should be below 200ms
  },
};

export default function () {
  const url = 'https://qa.xxxxx.io/gateway/ng/api/connectors?routingId=zEaak-FLS425IEO7OLzMUg&accountIdentifier=zEaak-FLS425IEO7OLzMUg';
  const params = {
    headers: {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdXRoVG9rZW4iOiI2NDA1Y2UxNjZhNzk3OTJiOTYyNzM5MGYiLCJpc3MiOiJIYXJuZXNzIEluYyIsImV4cCI6MTY3ODIwMDQxMywiZW52IjoiZ2F0ZXdheSIsImlhdCI6MTY3ODExMzk1M30.me858SSLQwZDt8sRQZOnGqoyioO5wtfBqfhnWM9U96A',
      'Content-Type': 'application/json',
    },
  };
  const data = {
    "connector":{name:`PerfdockerVenkat${__VU}_${__ITER}`,"description":"",identifier:`PerfdockerVenkat${__VU}_${__ITER}`,"tags":{},"type":"DockerRegistry","spec":{"executeOnDelegate":false,"dockerRegistryUrl":"https://docker.dev.nnnn.io","providerType":"DockerHub","auth":{"type":"Anonymous"}}}};
 const res = http.post(url, JSON.stringify(data),params);
 const responseId = res.json().data.connector.identifier;
 console.log(responseId);
}
export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
