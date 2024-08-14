using System.Security.Cryptography;
using System.Text;

namespace FurnitureAPI.Helpers
{
    public class HashHelper
    {
        public static string HashPasswordSHA256(string password)
        {
            SHA256 sha256 = SHA256.Create();
            byte[] bytes= sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            StringBuilder hashPassword = new StringBuilder();
            for(int i =0; i < bytes.Length; i++)
            {
                hashPassword.Append(bytes[i].ToString("x2"));
            }
            return hashPassword.ToString();
        }

        public static bool VerifyPasswordSHA256(string password, string hashPassword)
        {
            string verifyPassword = HashPasswordSHA256(password);
            return verifyPassword.Equals(hashPassword);
        }

        public static string HashPasswordMD5(string input)
        {
            StringBuilder hash = new StringBuilder();
            using (MD5 md5Hash = MD5.Create())
            {
                byte[] bytes = md5Hash.ComputeHash(new UTF8Encoding().GetBytes(input));

                for (int i = 0; i < bytes.Length; i++)
                {
                    hash.Append(bytes[i].ToString("x2"));
                }
                return hash.ToString();
            }
        }

        // momo encrypt
        public static string HmacSHA256(string input, string key)
        {
            byte[] keyByte = Encoding.UTF8.GetBytes(key);
            byte[] messageBytes = Encoding.UTF8.GetBytes(input);
            using (var hmacsha256 = new HMACSHA256(keyByte))
            {
                byte[] hashMessage = hmacsha256.ComputeHash(messageBytes);
                string hex = BitConverter.ToString(hashMessage);
                hex = hex.Replace("-", "").ToLower();
                return hex;
            }
        }
    }
}
