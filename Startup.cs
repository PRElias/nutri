using System.IO;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using nutri.Repositories;
using nutri.Services;

namespace nutri
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.Configure<CookiePolicyOptions>(options =>
            // {
            //     // This lambda determines whether user consent for non-essential cookies is needed for a given request.
            //     options.CheckConsentNeeded = context => true;
            // });

            // services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)  
            //      .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme, config =>  
            //      {  
            //          config.Cookie.Name = "UserLoginCookie";  
            //          config.LoginPath = "/Login/UserLogin";  
            //          config.LogoutPath = "/Login/UserLogout";
            //          config.AccessDeniedPath = "/Login/AccessDenied";
            //      });  
            
            services.AddControllersWithViews();
            services.AddRazorPages();
            services.AddControllers().AddNewtonsoftJson(options=> options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);
            services.Configure<EmailSettings>(Configuration.GetSection("EmailSettings"));
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddSingleton<NutriRepository>();
            // services.AddProgressiveWebApp();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            
            var loggingOptions = this.Configuration.GetSection("Log4NetCore").Get<Log4NetProviderOptions>();
            loggerFactory.AddLog4Net(loggingOptions);
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseHttpsRedirection();
            app.UseStaticFiles();

            //app.UseCookiePolicy();

            app.UseRouting();
            app.UseCors(option => {
                option.AllowAnyOrigin();
                option.AllowAnyHeader();
            });

            // app.UseAuthentication();
            // app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
            });
        }
    }
}
