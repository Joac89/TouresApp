using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using TouresB2C.Models;
using TouresCommon;

namespace TouresB2C.Services
{
    public class BonitaSession
    {
        public class BonitaCookie
        {
            public string Cookie { get; set; }
            public string Token { get; set; }
        }

        public BonitaCookie Cookies { get; set; }

        public void SetCookie(string urlAuthentication, CookieContainer cookie)
        {
            var result = new BonitaCookie();
            var getCookie = cookie.GetCookies(new Uri(urlAuthentication)).Cast<Cookie>().ToList();
            var token = getCookie.Where(x => x.Name == "X-Bonita-API-Token").FirstOrDefault().Value;
            var jsession = getCookie.Where(x => x.Name == "JSESSIONID").FirstOrDefault().Value;
            var tenant = getCookie.Where(x => x.Name == "bonita.tenant").FirstOrDefault().Value;
            var newCookie = $"X-Bonita-API-Token={token}; Path=/;JSESSIONID={jsession}; Path=/; HttpOnly;bonita.tenant={tenant}";

            Cookies = new BonitaCookie()
            {
                Cookie = newCookie,
                Token = token
            };
        }
        public Dictionary<string, string> GetFormContentLogin(string user, string password)
        {
            var formcontent = new Dictionary<string, string>(){
                    { "username", user },
                    { "password", password },
                    { "redirect", "false" }
                 };

            return formcontent;
        }
    }

    public class BonitaService
    {
        public async Task<ResponseBase<BonitaOrdenResponse>> Deploy(BonitaInstantiationModel data, string user, string password, string proccess)
        {
            var baseUrl = "http://10.39.1.135:8080";
            var authUrl = $"{baseUrl}/bonita/loginservice?username={user}&password={password}&redirect=false";
            var instUrl = $"{baseUrl}/bonita/API/bpm/process/{proccess}/instantiation";
            var container = new CookieContainer();
            var handler = new HttpClientHandler() { CookieContainer = container };
            var bonita = new BonitaSession();
            var cookie = new BonitaSession.BonitaCookie();
            var response = new ResponseBase<BonitaOrdenResponse>();
            var authenticated = false;

            using (var client = new HttpClient(handler))
            {
                var formcontent = bonita.GetFormContentLogin(user, password);
                var uri = new Uri(authUrl);
                var result = client.PostAsync(authUrl, new FormUrlEncodedContent(formcontent)).Result;

                if (result.IsSuccessStatusCode)
                {
                    bonita.SetCookie(authUrl, container);
                    authenticated = true;
                }
                else
                {
                    response.Code = (int)result.StatusCode;
                    response.Message = "Bonita Error";
                }
            }

            if (authenticated)
            {
                using (var client = new HttpClient())
                {
                    var jsonBody = JsonConvert.SerializeObject(data);
                    var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");

                    content.Headers.Add("Cookie", bonita.Cookies.Cookie);
                    content.Headers.Add("X-Bonita-API-Token", bonita.Cookies.Token);

                    var instantiation = client.PostAsync(instUrl, content).Result;
                    if (instantiation.IsSuccessStatusCode)
                    {
                        var json = instantiation.Content.ReadAsStringAsync().Result;
                        var serialize = JsonConvert.DeserializeObject<BonitaOrdenResponse>(json);

                        response.Code = Status.Ok;
                        response.Data = serialize;
                    }
                    else
                    {
                        response.Code = (int)instantiation.StatusCode;
                        response.Message = instantiation.Content.ToString();
                    }
                }
            }

            return await Task.Run(() => response);
        }
    }
}
