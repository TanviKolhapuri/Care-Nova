import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Shield, Users, Calendar, FileText, Activity, Phone, Mail, MapPin, Clock, Award, Stethoscope, UserCheck, Database, ChevronRight, Star } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Heart className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-gray-900">CARE NOVA</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
                            <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
                            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
                            <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
                            <Link href="/auth">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    Access Portal
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
                                Advanced Healthcare Management
                            </Badge>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Welcome to{" "}
                                <span className="text-blue-600">CARE NOVA</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Revolutionizing healthcare with our comprehensive hospital management system.
                                Streamline operations, enhance patient care, and empower your medical team with cutting-edge technology.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/auth">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8">
                                        Access Management System
                                        <ChevronRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button size="lg" variant="outline" className="text-lg px-8">
                                    Schedule Demo
                                </Button>
                            </div>
                            {/* <div className="flex items-center mt-8 space-x-6">
                                <div className="flex items-center">
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                    <span className="ml-2 text-gray-600">Trusted by 500+ hospitals</span>
                                </div>
                            </div> */}
                        </div>
                        <div className="relative">
                            <div className="bg-white rounded-2xl shadow-2xl p-8">
                                <Image
                                    src="/CareNova.png"
                                    alt="Hospital Management Dashboard"
                                    width={500}
                                    height={400}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>
                            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full">
                                <Activity className="h-6 w-6" />
                            </div>
                            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full">
                                <Shield className="h-6 w-6" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Healthcare Services</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            CARE NOVA provides comprehensive healthcare solutions with state-of-the-art facilities and expert medical professionals.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Stethoscope className="h-6 w-6 text-blue-600" />
                                </div>
                                <CardTitle>Emergency Care</CardTitle>
                                <CardDescription>24/7 emergency services with rapid response teams</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Heart className="h-6 w-6 text-green-600" />
                                </div>
                                <CardTitle>Cardiology</CardTitle>
                                <CardDescription>Advanced cardiac care and surgical procedures</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Activity className="h-6 w-6 text-purple-600" />
                                </div>
                                <CardTitle>Surgery</CardTitle>
                                <CardDescription>Minimally invasive and robotic surgical options</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="h-6 w-6 text-orange-600" />
                                </div>
                                <CardTitle>Pediatrics</CardTitle>
                                <CardDescription>Specialized care for infants, children, and adolescents</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <FileText className="h-6 w-6 text-red-600" />
                                </div>
                                <CardTitle>Diagnostics</CardTitle>
                                <CardDescription>Advanced imaging and laboratory services</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-teal-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                                    <UserCheck className="h-6 w-6 text-teal-600" />
                                </div>
                                <CardTitle>Rehabilitation</CardTitle>
                                <CardDescription>Physical therapy and recovery programs</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Management System Features</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Our comprehensive hospital management system streamlines operations and enhances patient care.
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-blue-100 p-3 rounded-lg">
                                        <Calendar className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Appointment Management</h3>
                                        <p className="text-gray-600">Efficient scheduling system for patients and healthcare providers</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-green-100 p-3 rounded-lg">
                                        <Database className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Electronic Health Records</h3>
                                        <p className="text-gray-600">Secure digital patient records accessible to authorized personnel</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-purple-100 p-3 rounded-lg">
                                        <Shield className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Security & Compliance</h3>
                                        <p className="text-gray-600">HIPAA compliant with advanced security measures</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="bg-orange-100 p-3 rounded-lg">
                                        <Activity className="h-6 w-6 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Analytics</h3>
                                        <p className="text-gray-600">Comprehensive reporting and analytics dashboard</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Image
                                src="/MgmtSystem.png"
                                alt="Hospital Management Dashboard"
                                width={500}
                                height={400}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <Image
                                src="/About.png"
                                alt="Hospital Management Dashboard"
                                width={500}
                                height={400}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">About CARE NOVA</h2>
                            <p className="text-lg text-gray-600 mb-6">
                                For over two decades, CARE NOVA has been at the forefront of healthcare innovation,
                                providing exceptional medical care and pioneering treatment solutions. Our commitment
                                to excellence has made us a trusted healthcare partner for thousands of families.
                            </p>
                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                                    <div className="text-gray-600">Beds Available</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                                    <div className="text-gray-600">Medical Experts</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                                    <div className="text-gray-600">Patients Served</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
                                    <div className="text-gray-600">Specialties</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <Award className="h-8 w-8 text-yellow-500" />
                                <span className="text-gray-700">JCI Accredited Healthcare Facility</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                        <p className="text-xl text-gray-600">We're here to help you with all your healthcare needs</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Phone className="h-8 w-8 text-blue-600" />
                                </div>
                                <CardTitle>Emergency Hotline</CardTitle>
                                <CardDescription className="text-lg">+1 (555) 911-CARE</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Mail className="h-8 w-8 text-green-600" />
                                </div>
                                <CardTitle>Email Us</CardTitle>
                                <CardDescription className="text-lg">info@carenova.com</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MapPin className="h-8 w-8 text-purple-600" />
                                </div>
                                <CardTitle>Visit Us</CardTitle>
                                <CardDescription className="text-lg">123 Healthcare Ave, Medical District</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="text-center mt-12">
                        <div className="flex items-center justify-center space-x-2 text-gray-600 mb-4">
                            <Clock className="h-5 w-5" />
                            <span>24/7 Emergency Services Available</span>
                        </div>
                        <Link href="/auth">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                Access Management Portal
                                <ChevronRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-blue-600 p-2 rounded-lg">
                                    <Heart className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-bold">CARE NOVA</span>
                            </div>
                            <p className="text-gray-400">
                                Leading healthcare provider committed to excellence in patient care and medical innovation.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Services</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>Emergency Care</li>
                                <li>Cardiology</li>
                                <li>Surgery</li>
                                <li>Pediatrics</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
                            <ul className="space-y-2 text-gray-400">
                                <li>+1 (555) 911-CARE</li>
                                <li>info@carenova.com</li>
                                <li>123 Healthcare Ave</li>
                                <li>Medical District</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                        <p>&copy; 2024 CARE NOVA Hospital. All rights reserved. | Privacy Policy | Terms of Service</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
