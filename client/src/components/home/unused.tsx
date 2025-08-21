 {/*
    const cards = [
        {
            title: "C",
            desc: "Coding workshops and hands-on projects to boost your programming skills.",
            icon: Code,
        },
        {
            title: "O",
            desc: "Opportunities to collaborate in hackathons, competitions, and team projects.",
            icon: Users,
        },
        {
            title: "D",
            desc: "Development guidance from senior students, mentors, and alumni.",
            icon: Rocket,
        },
        {
            title: "E",
            desc: "Engaging events and community activities to connect with other tech enthusiasts.",
            icon: Sparkles,
        },
    ];

    const underlineVariants = {
    hidden: { width: 0 },
    visible: { width: "150px", transition: { duration: 1 } },
  };
    
    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="mb-12 flex flex-col items-center justify-center space-y-4 text-center"
                    >
                      <Badge
                        className="rounded-full px-4 py-1.5 text-sm font-medium shadow-sm"
                        variant="secondary"
                      >
                        <span className="text-primary mr-1">✦</span> About CODE
                      </Badge>
            
                      <h2 className="from-foreground to-foreground/80 bg-gradient-to-r bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                        Powerful Customization Tools
                      </h2>
                      <p className="text-muted-foreground max-w-[800px] md:text-lg">
                        All the tools you need to customize your shadcn/ui components and make them unique.
                      </p>
                    </motion.div>

            {/* Title */}
            {/*<div className="flex flex-col items-center">
                <motion.h1
                    className="text-4xl font-bold mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About CODE
                </motion.h1>

                <motion.div
                    variants={underlineVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-1 bg-gradient-to-r from-primary mt-2"
                    style={{ maxWidth: "300px" }}
                />
            </div> 

            <div className="flex flex-col-reverse md:flex-row items-center justify-around gap-2">

                <motion.p
                    className="text-lg leading-relaxed max-w-xl text-center md:text-left"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <span className="font-bold text-2xl">CODE</span> is a university club
                    dedicated to nurturing programming skills, promoting collaboration, and
                    creating real-world projects for students. <br />
                    We organize <span className="font-semibold">workshops, hackathons, and mentorship programs </span>
                    to help students grow in the world of tech.
                </motion.p>

                <motion.img
                    src="/about.svg"
                    alt="About img"
                    className="w-64 h-64 md:w-80 md:h-80 object-contain"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    viewport={{ once: true }}
                    whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{ scale: 0.95 }}
                />

            </div>

            <div className='flex flex-col items-center mt-10'>
                <motion.p
                    className="text-xl leading-relaxed max-w-3xl mx-auto text-center "
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    Why CODE ?
                </motion.p>
                <motion.div
                    variants={underlineVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-1 bg-gradient-to-l from-primary mt-2"
                    style={{ maxWidth: "150px" }}
                />
            </div>
            <motion.p
                className="text leading-relaxed max-w-4xl mx-auto text-center mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                What The name of our club means
            </motion.p>


            <div className="mt-10 grid md:grid-cols-4 gap-6">
                {cards.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05, boxShadow: '0px 15px 25px rgba(0,0,0,0.2)' }}
                        transition={{ duration: 0.2, delay: 0.2 * i }}
                    >
                        <Card className="h-full  hover:shadow-lg transition-shadow duration-200 hover:border-primary ">
                            <CardContent className="flex flex-col items-center text-center">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <item.icon className="w-6 h-6 text-secondary bg-primary rounded-b-4xl" />
                                    <h2 className="text-2xl font-bold">{item.title}</h2>
                                </div>
                                <p className="text-base text-neutral-300">{item.desc}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div> */}