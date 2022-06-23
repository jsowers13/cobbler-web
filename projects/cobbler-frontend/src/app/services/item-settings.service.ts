import {Injectable} from '@angular/core';
import {CobblerApiService} from 'cobbler-api';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ItemSettingsService {
  mockdata = [
    {name: "allow_duplicate_hostnames", value: 0, type: 'bool'},
    {name: 'allow_duplicate_ips', value: 0, type: 'bool'},
    {name: 'allow_duplicate_macs', value: 0, type: 'bool'},
    {name: 'allow_dynamic_settings', value: 0, type: 'bool'},
    {name: 'always_write_dhcp_entries', value: 0, type: 'bool'},
    {name: 'anamon_enabled', value: 0, type: 'bool'},
    {name: 'auth_token_expiration', value: 3600, type: 'int'},
    {name: 'authn_pam_service', value: 'login', type: 'str'},
    {name: 'autoinstall_snippets_dir', value: '/var/lib/cobbler/snippets', type: 'str'},
    {name: 'autoinstall_templates_dir', value: '/var/lib/cobbler/templates', type: 'str'},
    {name: 'bind_chroot_path', value: '', type: 'str'},
    {name: 'bind_master', value: '127.0.0.1', type: 'str'},
    {name: 'boot_loader_conf_template_dir', value: '/etc/cobbler/boot_loader_conf', type: 'str'},
    {name: 'bootloaders_dir', value: '/var/lib/cobbler/loaders', type: 'str'},
    {name: 'grubconfig_dir', value: '/var/lib/cobbler/grub_config', type: 'str'},
    {name: 'build_reporting_enabled', value: 0, type: 'bool'},
    {name: 'build_reporting_ignorelist', value: '', type: 'str'},
    {name: 'build_reporting_sender', value: '', type: 'str'},
    {name: 'build_reporting_smtp_server', value: 'localhost', type: 'str'},
    {name: 'build_reporting_subject', value: '', type: 'str'},
    {name: 'buildisodir', value: '/var/cache/cobbler/buildiso', type: 'str'},
    {name: 'cache_enabled', value: 1, type: 'bool'},
    {name: 'cheetah_import_whitelist', value: ['re', 'random', 'time'], type: 'list'},
    {name: 'client_use_https', value: 0, type: 'bool'},
    {name: 'client_use_localhost', value: 0, type: 'bool'},
    {name: 'cobbler_master', value: '', type: 'str'},
    {name: 'convert_server_to_ip', value: 0, type: 'bool'},
    {name: 'createrepo_flags', value: '-c cache -s sha', type: 'str'},
    {name: 'default_autoinstall', value: '/var/lib/cobbler/templates/default.ks', type: 'str'},
    {name: 'default_name_servers', value: [], type: 'list'},
    {name: 'default_name_servers_search', value: [], type: 'list'},
    {name: 'default_ownership', value: ['admin'], type: 'list'},
    {name: 'default_password_crypted', value: '\$1\$mF86/UHC\$WvcIcX2t6crBz2onWxyac.', type: 'str'},
    {name: 'default_template_type', value: 'cheetah', type: 'str'},
    {name: 'default_virt_bridge', value: 'xenbr0', type: 'str'},
    {name: 'default_virt_disk_driver', value: 'raw', type: 'str'},
    {name: 'default_virt_file_size', value: 5, type: 'int'},
    {name: 'default_virt_ram', value: 512, type: 'int'},
    {name: 'default_virt_type', value: 'auto', type: 'str'},
    {name: 'enable_gpxe', value: 0, type: 'bool'},
    {name: 'enable_menu', value: 1, type: 'bool'},
    {name: 'http_port', value: 80, type: 'int'},
    {name: 'include', value: ['/etc/cobbler/settings.d/*.settings'], type: 'list'},
    {name: 'iso_template_dir', value: '/etc/cobbler/iso', type: 'str'},
    {name: 'kernel_options', value: {}, type: 'dict'},
    {name: 'ldap_anonymous_bind', value: 1, type: 'bool'},
    {name: 'ldap_base_dn', value: 'DC=devel,DC=redhat,DC=com', type: 'str'},
    {name: 'ldap_port', value: 389, type: 'int'},
    {name: 'ldap_search_bind_dn', value: '', type: 'str'},
    {name: 'ldap_search_passwd', value: '', type: 'str'},
    {name: 'ldap_search_prefix', value: 'uid=', type: 'str'},
    {name: 'ldap_server', value: 'grimlock.devel.redhat.com', type: 'str'},
    {name: 'ldap_tls', value: 'on', type: 'str'},
    {name: 'ldap_tls_cacertfile', value: '', type: 'str'},
    {name: 'ldap_tls_certfile', value: '', type: 'str'},
    {name: 'ldap_tls_keyfile', value: '', type: 'str'},
    {name: 'bind_manage_ipmi', value: 0, type: 'bool'},
    {name: 'manage_dhcp', value: 0, type: 'bool'},
    {name: 'manage_dns', value: 0, type: 'bool'},
    {name: 'manage_forward_zones', value: [], type: 'list'},
    {name: 'manage_reverse_zones', value: [], type: 'list'},
    {name: 'manage_genders', value: 0, type: 'bool'},
    {name: 'manage_rsync', value: 0, type: 'bool'},
    {name: 'manage_tftp', value: 1, type: 'bool'},
    {name: 'manage_tftpd', value: 1, type: 'bool'},
    {name: 'mgmt_classes', value: [], type: 'list'},
    {name: 'mgmt_parameters', value: {}, type: 'dict'},
    {name: 'next_server', value: '127.0.0.1', type: 'str'},
    {name: 'nsupdate_enabled', value: 0, type: 'bool'},
    {name: 'power_management_default_type', value: 'ipmitool', type: 'str'},
    {name: 'proxy_url_ext', value: '', type: 'str'},
    {name: 'proxy_url_int', value: '', type: 'str'},
    {name: 'puppet_auto_setup', value: 0, type: 'bool'},
    {name: 'puppet_parameterized_classes', value: 1, type: 'bool'},
    {name: 'puppet_server', value: 'puppet', type: 'str'},
    {name: 'puppet_version', value: 2, type: 'int'},
    {name: 'puppetca_path', value: '/usr/bin/puppet', type: 'str'},
    {name: 'pxe_just_once', value: 1, type: 'bool'},
    {name: 'nopxe_with_triggers', value: 1, type: 'bool'},
    {name: 'redhat_management_permissive', value: 0, type: 'bool'},
    {name: 'redhat_management_server', value: 'xmlrpc.rhn.redhat.com', type: 'str'},
    {name: 'redhat_management_key', value: '', type: 'str'},
    {name: 'register_new_installs', value: 0, type: 'bool'},
    {name: 'remove_old_puppet_certs_automatically', value: 0, type: 'bool'},
    {name: 'replicate_repo_rsync_options', value: '-avzH', type: 'str'},
    {name: 'replicate_rsync_options', value: '-avzH', type: 'str'},
    {name: 'reposync_flags', value: '-l -m -d', type: 'str'},
    {name: 'restart_dhcp', value: 1, type: 'bool'},
    {name: 'restart_dns', value: 1, type: 'bool'},
    {name: 'run_install_triggers', value: 1, type: 'bool'},
    {name: 'scm_track_enabled', value: 0, type: 'bool'},
    {name: 'scm_track_mode', value: 'git', type: 'str'},
    {name: 'scm_track_author', value: 'cobbler <cobbler@localhost>', type: 'str'},
    {name: 'scm_push_script', value: '/bin/true', type: 'str'},
    {name: 'serializer_pretty_json', value: 0, type: 'bool'},
    {name: 'server', value: '127.0.0.1', type: 'str'},
    {name: 'sign_puppet_certs_automatically', value: 0, type: 'bool'},
    {name: 'signature_path', value: '/var/lib/cobbler/distro_signatures.json', type: 'str'},
    {name: 'signature_url', value: 'https://cobbler.github.io/signatures/3.0.x/latest.json', type: 'str'},
    {name: 'tftpboot_location', value: '/var/lib/tftpboot', type: 'str'},
    {name: 'virt_auto_boot', value: 0, type: 'bool'},
    {name: 'webdir', value: '/var/www/cobbler', type: 'str'},
    {name: 'webdir_whitelist', value: ['.link_cache', 'misc', 'distro_mirror', 'images', 'links', 'localmirror', 'pub',
        'rendered', 'repo_mirror', 'repo_profile', 'repo_system', 'svc', 'web', 'webui'], type: 'list'},
    {name: 'xmlrpc_port', value: 25151, type: 'int'},
    {name: 'yum_distro_priority', value: 1, type: 'int'},
    {name: 'yum_post_install_mirror', value: 1, type: 'bool'},
    {name: 'yumdownloader_flags', value: '--resolve', type: 'str'},
  ];

  constructor(
    public authO: UserService,
    private cobblerApiService: CobblerApiService
  ) {
    cobblerApiService.get_settings(authO.token).subscribe(value => {
      console.log(value)
    })
  }

  getAll(): Array<object> {
    return this.mockdata;
  }

  getitem(name: string): any {
    const data = this.mockdata[name];
    if (data !== null) {
      return data;
    }
  }
}
