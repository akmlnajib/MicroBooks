
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { FaRegCommentDots } from 'react-icons/fa';
import moment from 'moment';

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth}
        >
            <header className="bg-background shadow">
                <div className="lg:ms-12 mx-auto max-w-8xl p-4 sm:p-6"> </div>
            </header>
            <Head title="Dashboard" />

            <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 mt-10">
                <div className="py-4">
                    <div className="flex flex-wrap gap-6 justify-center">
                        <div className="p-6 bg-base-100 shadow-xl bg-background flex flex-col w-80">
                            <figure className="flex-shrink-0">
                                <img
                                    src="https://deepublishstore.com/wp-content/uploads/2020/02/Dasar-Dasar-Pemrograman-dengan-Python_Wenty-Dwi-Yuniart-rev-1.0-Convert-depan.jpg"
                                    alt="Shoes"
                                    className="w-full h-80 object-cover"
                                />
                            </figure>
                            <div className="mt-2 card-body text-foreground flex-1 flex flex-col justify-between">
                                <h2 className="card-title">Author: Lorem, ipsum.</h2>
                                <p className='mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <span className="card-actions mt-auto flex">
                                    <BsHeartFill className="text-2xl ms-2 text-danger me-2" />
                                    (140) Likes
                                    <FaRegCommentDots className="text-2xl ms-2 me-2" />
                                    (40) Komentar
                                </span>
                            </div>
                        </div>
                        <div className="p-6 bg-base-100 shadow-xl bg-background flex flex-col w-80">
                            <figure className="flex-shrink-0">
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7TcZpzULmBx9R4i9rO3Jfs7pzYZAeINDDkQ&s"
                                    alt="Shoes"
                                    className="w-full h-80 object-cover"
                                />
                            </figure>
                            <div className="mt-2 card-body text-foreground flex-1 flex flex-col justify-between">
                                <h2 className="card-title">Author: Lorem, ipsum.</h2>
                                <p className='mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <span className="card-actions mt-auto flex">
                                    <BsHeart className="text-2xl  ms-2 me-2" />
                                    (243) Likes
                                    <FaRegCommentDots className="text-2xl ms-2 me-2" />
                                    (35) Komentar
                                </span>
                            </div>
                        </div>
                        <div className="p-6 bg-base-100 shadow-xl bg-background flex flex-col w-80">
                            <figure className="flex-shrink-0">
                                <img
                                    src="https://www.malasngoding.com/wp-content/uploads/2020/02/Ebook-Panduan-Lengkap-Laravel-Untuk-Pemula-Dari-Dasar-Sampai-Membuat-Aplikasi-Keuangan.png"
                                    alt="Shoes"
                                    className="w-full h-80 object-cover"
                                />
                            </figure>
                            <div className="mt-2 card-body text-foreground flex-1 flex flex-col justify-between">
                                <h2 className="card-title">Author: Lorem, ipsum.</h2>
                                <p className='mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <span className="card-actions mt-auto flex">
                                    <BsHeartFill className="text-2xl text-danger ms-2 me-2" />
                                    (432) Likes
                                    <FaRegCommentDots className="text-2xl ms-2 me-2" />
                                    (52) Komentar
                                </span>
                            </div>
                        </div>
                        <div className="p-6 bg-base-100 shadow-xl bg-background flex flex-col w-80">
                            <figure className="flex-shrink-0">
                                <img
                                    src="https://down-id.img.susercontent.com/file/9cea3a7586fd9d8b45f272f0e380f15f"
                                    alt="Shoes"
                                    className="w-full h-80 object-cover"
                                />
                            </figure>
                            <div className="mt-2 card-body text-foreground flex-1 flex flex-col justify-between">
                                <h2 className="card-title">Author: Lorem, ipsum.</h2>
                                <p className='mb-2'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
                                <span className="card-actions mt-auto flex">
                                    <BsHeart className="text-2xl  ms-2 me-2" />
                                    (645) Likes
                                    <FaRegCommentDots className="text-2xl ms-2 me-2" />
                                    (10) Komentar
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:ms-12 mt-auto flex gap-2 sm:p-6">
                    <Link className="font-medium" href="/">
                        &copy; MicroBooks {moment().format("Y")}
                    </Link>
                    <span className="flex items-center gap-1">
                        <BsHeartFill className="text-sm text-danger" />
                    </span>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}