using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace Helper
{
    public static class ResultCode
    {
        public static class Code
        {
            public const string Success = "00";
            public const string InternalServerError = "500";
        }
        public static class Message
        {
            public const string Success = "Success";
            public const string InternalServerError = "500";
        }

        public static string GetMessage(string code)
        {
            try
            {
                var name = typeof(Code).GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                    .Single(fi => fi.IsLiteral && !fi.IsInitOnly && fi.GetValue(null)!.ToString() == code).Name;
                return typeof(Message).GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                    .Single(fi => fi.IsLiteral && !fi.IsInitOnly && fi.Name == name).GetRawConstantValue()!.ToString()!;
            }
            catch
            {
                return "Unknown Error Code";
            }
        }
    }
}
