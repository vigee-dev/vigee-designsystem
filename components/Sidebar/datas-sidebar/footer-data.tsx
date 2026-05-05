/**
 * @description Données statiques de l'utilisateur affiché dans le footer de la sidebar (nom, email, avatar).
 * @useWhen initialiser FooterSidebar avec un utilisateur par défaut en dev/démo | remplacer par les données réelles de session avant mise en production
 * @dontUseFor affichage dynamique de l'utilisateur connecté → injecter directement les données de session dans FooterSidebar | gestion de profil → utiliser ProfileImageUploader
 * @example <FooterSidebar user={userSidebar} />
 */
export const userSidebar = {
    name: "Admin Vigee",
    email: "admin@vigee.fr",
    avatar: "/icon-512x512.png",
};