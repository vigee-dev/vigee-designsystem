/**
 * @description Affiche une photo de profil circulaire avec fallback automatique sur initiales ou placeholder si l'image est absente.
 * @useWhen afficher l'avatar d'un utilisateur avec une URL d'image → utiliser Avatar + AvatarImage + AvatarFallback | image potentiellement absente ou en erreur → AvatarFallback prend le relais automatiquement | liste d'utilisateurs, commentaires, profils → associer un visuel à une identité
 * @dontUseFor upload ou modification de photo de profil → utiliser Forms/ProfileImageUploader | affichage d'un avatar Vigee enrichi (avec statut, taille normalisée, etc.) → utiliser Avatar/Avatar
 * @example <Avatar><AvatarImage src={user.photoUrl} alt={user.name} /><AvatarFallback>AB</AvatarFallback></Avatar>
 */
"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "../lib/utils";

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root ref={ref} className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)} {...props} />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Image>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-full w-full", className)} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Fallback>, React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback ref={ref} className={cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className)} {...props} />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
