using System;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

class HeartbeatSender
{
    private static readonly HttpClient _httpClient = new HttpClient();
    private static readonly string _heartbeatUrl = "http://flachsbruecke-ulm.de:3000/api/heartbeat";
    private static readonly string _machineId = Environment.MachineName; // Or Guid.NewGuid().ToString()

    static async Task Main(string[] args)
    {
        Console.WriteLine("Heartbeat Sender started...");
        while (true)
        {
            try
            {
                var heartbeatData = new
                {
                    id = _machineId,
                    timestamp = DateTime.UtcNow
                };

                var json = JsonSerializer.Serialize(heartbeatData);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync(_heartbeatUrl, content);
                if (response.IsSuccessStatusCode)
                {
                    Console.WriteLine($"[{DateTime.Now}] Heartbeat sent: {_machineId}");
                }
                else
                {
                    Console.WriteLine($"[{DateTime.Now}] Failed to send heartbeat. Status: {response.StatusCode}");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[{DateTime.Now}] Error: {ex.Message}");
            }

            await Task.Delay(TimeSpan.FromSeconds(30));
        }
    }
}