namespace Back.Models.Entidades.Usuario
{
    public class UsuarioModel
    {
        public string Id { get; set; }
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Email { get; set; }
        public string Contrasena { get; set; }
        public int IdRol { get; set; }
        public string TipoDocumento { get; set; }
        public string Sexo { get; set; }
        public string NumDocumento { get; set; }
        public string Telefono { get; set; }
        public int Puntos { get; set; }
        public string Direccion { get; set; }
        public bool Estado { get; set; }
    }
}
