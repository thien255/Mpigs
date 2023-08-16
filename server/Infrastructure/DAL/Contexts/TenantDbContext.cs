using System;
using System.Collections.Generic;
using System.Runtime.Intrinsics.X86;
using DAL.Models.Tenant;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.VisualBasic;

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

    public virtual DbSet<Tenant> Tenants { get; set; }

    public virtual DbSet<TenantUser> TenantUsers { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
       #warning  To protect potentially sensitive information in your connection string, you should move it out of source code.You can avoid scaffolding the connection string by using the Name = syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        //=> optionsBuilder.UseSqlServer("Server=.;Database=Tenant;Trusted_Connection=True;MultipleActiveResultSets=true;App=EntityFramework;Encrypt=false;TrustServerCertificate=true");
    }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Tenant>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Tenant__3214EC076C842500");
            entity.ToTable("Tenant");
            entity.Property(e => e.Address).HasMaxLength(500);
            entity.Property(e => e.Code)
            .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.CreatedBy)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.CreatedOn)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive)
                .IsRequired()
                .HasDefaultValueSql("((1))");
            entity.Property(e => e.LatestUpdatedBy)
                .HasMaxLength(60)
                .IsUnicode(false);
            entity.Property(e => e.LatestUpdatedOn).HasColumnType("datetime");
            entity.Property(e => e.Logo).HasMaxLength(500);
            entity.Property(e => e.Name)
                .HasMaxLength(120)
                .IsUnicode(false);
            entity.Property(e => e.Representative).HasMaxLength(100);
            entity.Property(e => e.RepresentativePhone)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.SubscriptionEndDateUtc).HasColumnType("datetime");
            entity.Property(e => e.TaxCode)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<TenantUser>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__TenantUs__3214EC07B567FE74");

            entity.ToTable("TenantUser");

            entity.Property(e => e.IsActive)
                .HasMaxLength(10)
                .HasDefaultValueSql("((1))")
                .IsFixedLength();
            entity.Property(e => e.User)
                .HasMaxLength(60)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
