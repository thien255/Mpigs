using System;
using System.Collections.Generic;
using DAL.Models.Tenant;
using Microsoft.EntityFrameworkCore;

namespace DAL.Contexts;

public partial class TenantDbContext : DbContext
{
    public TenantDbContext()
    {
    }

    public TenantDbContext(DbContextOptions<TenantDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Country> Countries { get; set; }

    public virtual DbSet<District> Districts { get; set; }

    public virtual DbSet<Logged> Loggeds { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<StateOrProvince> StateOrProvinces { get; set; }

    public virtual DbSet<Tenant> Tenants { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserRole> UserRoles { get; set; }

    public virtual DbSet<UserTenant> UserTenants { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=.;Database=Tenant;Trusted_Connection=True;MultipleActiveResultSets=true;App=EntityFramework;Encrypt=false;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Address__3214EC079A0EB931");

            entity.ToTable("Address");

            entity.Property(e => e.City).HasMaxLength(450);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Zipcode)
                .HasMaxLength(60)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Country>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Country__3214EC07C9CE8E3B");

            entity.ToTable("Country");

            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(250);
        });

        modelBuilder.Entity<District>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__District__3214EC07AF36306F");

            entity.ToTable("District");

            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Type)
                .HasMaxLength(60)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Logged>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Logged__3214EC07B23976DC");

            entity.ToTable("Logged");

            entity.Property(e => e.AccessToken).IsUnicode(false);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.DeviceId).HasMaxLength(250);
            entity.Property(e => e.ExpTime).HasColumnType("datetime");
            entity.Property(e => e.RefreshToken).IsUnicode(false);
            entity.Property(e => e.RefreshTokenExpiryTime).HasColumnType("datetime");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Key).HasName("PK__Roles__DA15413FE8C0A1F6");

            entity.Property(e => e.Key)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("Role");
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasDefaultValueSql("('system')");
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Description)
                .HasMaxLength(250)
                .IsUnicode(false);
        });

        modelBuilder.Entity<StateOrProvince>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__StateOrP__3214EC075E1C2688");

            entity.ToTable("StateOrProvince");

            entity.Property(e => e.Code)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Type)
                .HasMaxLength(60)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tenant__3214EC0721B722F8");

            entity.ToTable("Tenant");

            entity.Property(e => e.Address).HasMaxLength(250);
            entity.Property(e => e.Code)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.Expired).HasColumnType("datetime");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.LatestUpdatedOn).HasColumnType("datetime");
            entity.Property(e => e.License).HasMaxLength(250);
            entity.Property(e => e.Logo).HasMaxLength(250);
            entity.Property(e => e.Name).HasMaxLength(150);
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Representative).HasMaxLength(60);
            entity.Property(e => e.Scale).HasMaxLength(250);
            entity.Property(e => e.ShortName).HasMaxLength(60);
            entity.Property(e => e.Type)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.UpdatedBy)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC075A316C0C");

            entity.Property(e => e.CreatedBy).HasMaxLength(60);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Culture)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Email)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.FistName).HasMaxLength(30);
            entity.Property(e => e.FullName).HasMaxLength(60);
            entity.Property(e => e.IsDelete).HasDefaultValueSql("((0))");
            entity.Property(e => e.LastName)
                .HasMaxLength(30)
                .IsUnicode(false);
            entity.Property(e => e.LatestUpdatedBy).HasMaxLength(60);
            entity.Property(e => e.LatestUpdatedOn).HasColumnType("datetime");
            entity.Property(e => e.Password).IsUnicode(false);
            entity.Property(e => e.PhoneNumber)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.TwoFactorEnabled).HasDefaultValueSql("((0))");
            entity.Property(e => e.UserName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserRole>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("UserRole");

            entity.Property(e => e.CreatedBy)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasDefaultValueSql("('system')");
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Role)
                .HasMaxLength(100)
                .IsUnicode(false);
        });

        modelBuilder.Entity<UserTenant>(entity =>
        {
            entity.HasNoKey();

            entity.HasOne(d => d.Tenant).WithMany()
                .HasForeignKey(d => d.TenantId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserTenan__Tenan__4222D4EF");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__UserTenan__UserI__403A8C7D");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
