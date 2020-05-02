using Microsoft.Extensions.Options;
using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace nutri.Services
{
    public class AuthMessageSender : IEmailSender
    {
        public AuthMessageSender(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        public EmailSettings _emailSettings { get; }

        public Task SendEmailAsync(string email = null, string subject = null, string message = null)
        {
            try
            {
                Execute(email, subject, message).Wait();
                return Task.FromResult(0);
            }
            catch (Exception)
            {
                throw;
            }
        }

        private async Task Execute(string email, string subject, string message)
        {
            if (_emailSettings.EnvioAtivado)
            {
                try
                {
                    string toEmail = string.IsNullOrEmpty(email) ? _emailSettings.ToEmail : email;

                    MailMessage mail = new MailMessage()
                    {
                        From = new MailAddress(_emailSettings.UsernameEmail, "nutri Máquinas")
                    };

                    mail.To.Add(new MailAddress(toEmail));
                    if (!string.IsNullOrEmpty(_emailSettings.CcEmail))
                        mail.CC.Add(new MailAddress(_emailSettings.CcEmail));

                    mail.Subject = subject;
                    mail.Body = message;
                    mail.IsBodyHtml = true;
                    //mail.Priority = MailPriority.High;

                    //outras opções
                    //mail.Attachments.Add(new Attachment(arquivo));
                    //

                    using (SmtpClient smtp = new SmtpClient(_emailSettings.PrimaryDomain, _emailSettings.PrimaryPort))
                    {
                        //smtp.UseDefaultCredentials = false;
                        smtp.Credentials = new NetworkCredential(_emailSettings.UsernameEmail, _emailSettings.UsernamePassword, "nutrimaquinas.com.br");
                        //smtp.EnableSsl = false;
                        await smtp.SendMailAsync(mail);
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}