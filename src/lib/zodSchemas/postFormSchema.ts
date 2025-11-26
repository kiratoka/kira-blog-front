import { z } from "zod";

// 
// Apakah sudah benar sesuai data? Komentar berikut memberikan penjelasan sesuai konteks aplikasi yang sudah ada:
//
// - postId: field opsional bertipe string yang di-transform menjadi number. Namun pada create post sepertinya TIDAK DIPAKAI, karena dari context backend (NestJS Controller & InputCreatePost.tsx), post baru TIDAK membutuhkan postId dari frontend. Jika form ini hanya untuk CREATE post, lebih baik TIDAK ADA postId.
// 
// - title: string, panjang minimal 5 dan maksimal 100 karakter. Ini SUDAH SESUAI dengan kebutuhan umum judul postingan.
// 
// - content: string, minimal 20 karakter. Ini juga SUDAH SESUAI untuk konten blog/post.
// 
// - tags: array of {id:string, name:string}. Dari InputCreatePost.tsx, memang format tag adalah {id, name} — SUDAH BENAR.
// 
// - thumbnail: opsional, instance dari File. InputCreatePost.tsx menggunakan file, jadi SUDAH BENAR.
// 
// - published: bertipe string dengan transform ke boolean (value === "on"). Namun, pada state InputCreatePost.tsx, properti ini bernama isPublished dan berupa boolean, bukan string. Di sisi frontend, sebaiknya properti form juga 'isPublished' boolean, agar konsisten. 
//   Jadi, field ini sebaiknya diubah ke:
//     isPublished: z.boolean()
//   ...atau, jika input HTML-nya berupa checkbox (value "on"), maka bisa tetap dengan string-transform ini.
// 
// Penyesuaian SARAN JIKA HANYA UNTUK CREATE POST:
//  - Hapus postId
//  - Ubah published → isPublished (z.boolean())
//  - atau, jika tetap ngambil value dari checkbox default HTML ("on"), transform seperti sebelumnya boleh — pastikan nama field konsisten.
//
// Versi revisi: tanpa postId, dan properti boolean untuk isPublished agar cocok dengan InputCreatePost.tsx

export const PostFormSchema = z.object({
    title: z.string().min(5).max(100),
    content: z.string().min(20),
    tags: z.array(
        z.object({
            id: z.string(),
            name: z.string().min(1),
        })
    ),
    thumbnail: z.instanceof(File).optional(),
    isPublished: z.boolean(),
});
