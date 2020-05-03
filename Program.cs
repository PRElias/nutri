using System.IO;
using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;

namespace nutri
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                }).ConfigureWebHost(webBuilder =>
                {
                    webBuilder.UseKestrel(options =>
                    {
                        options.Listen(System.Net.IPAddress.Parse("192.168.0.16"), 15443, listenOptions =>
                        {
                            // var serverCertificate = LoadCertificate();
                            // listenOptions.UseHttps(serverCertificate); // <- Configures SSL
                        });
                    });
                });

        private static X509Certificate2 LoadCertificate()
        {
            string currentDirName = System.IO.Directory.GetCurrentDirectory();
            string[] files = System.IO.Directory.GetFiles(currentDirName, "pepeu.linkpc.net/pepeu-certificate.pfx");
            var certificado = new System.IO.FileInfo(files[0]);
            
            using (var certificateStream = certificado.OpenRead())
            {
                byte[] certificatePayload;
                using (var memoryStream = new MemoryStream())
                {
                    certificateStream.CopyTo(memoryStream);
                    certificatePayload = memoryStream.ToArray();
                }

                return new X509Certificate2(certificatePayload, "admin");
            }
        }
    }
}
